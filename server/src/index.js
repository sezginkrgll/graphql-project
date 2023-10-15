import { createServer } from "node:http";
import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { loadFiles } from "@graphql-tools/load-files";
import url from "url";
// WebSocket
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

// import data.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const db = require("./data.json");

const pubSub = createPubSub();

// Provide your schema
const yogaApp = createYoga({
  graphqlEndpoint: "/",
  schema: createSchema({
    typeDefs: await loadFiles("src/graphql/typeDefs/**/*.graphql"),
    resolvers: await loadFiles("src/graphql/resolvers/**/*.js", {
      requireMethod: async (path) => await import(url.pathToFileURL(path)),
    }),
  }),
  context: {
    pubSub,
    db,
  },
});

const httpServer = createServer(yogaApp);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: yogaApp.graphqlEndpoint,
});

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yogaApp.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };

      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer
);

httpServer.listen(4000, () => {
  console.info("Server is running on http://localhost:4000");
});
