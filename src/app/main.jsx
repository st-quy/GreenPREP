import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { Provider } from "react-redux";
import RouteProvider from "./providers/RouteProvider";
import store from "./providers/store";
import { FullScreenProvider } from "./providers/FullScreenProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Suspense>
        {/* <FullScreenProvider> */}
        <RouteProvider />
        {/* </FullScreenProvider> */}
      </Suspense>
    </QueryClientProvider>
  </Provider>
);
