import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StrictMode>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </StrictMode>
  </HashRouter>,
);
