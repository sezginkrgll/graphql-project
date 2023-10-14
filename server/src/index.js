import { createServer } from "node:http";
import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { loadFiles } from "@graphql-tools/load-files";
import url from "url";
// import data.json
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const db = require("./data.json");

const pubSub = createPubSub();

// Provide your schema
const yoga = createYoga({
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

const server = createServer(yoga);
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000");
});
