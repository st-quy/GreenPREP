import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { Provider } from "react-redux";
import RouteProvider from "@app/providers/RouteProvider";
import store from "./providers/store";
import { FullScreenProvider } from "./providers/FullScreenProvider";
import TestData from "@features/navigation/components/testData";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <FullScreenProvider>
          <RouteProvider />
          <TestData topicId="ef6b69aa-2ec2-4c65-bf48-294fd12e13fc"/> 
        </FullScreenProvider>
      </Suspense>
    </QueryClientProvider>
  </Provider>
);
