import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Apollo Client
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
// Chakra-UI
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        color: "gray.700",
        // bg: "gray.100",
      },
      "&::-webkit-scrollbar": {
        height: "4px",
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "gray.200",
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "gray.400",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "gray.500",
      },
    }),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
