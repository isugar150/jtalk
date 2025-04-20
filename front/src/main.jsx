import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </StrictMode>
  </HashRouter>,
);
