import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CopilotKit } from "@copilotkit/react-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@copilotkit/react-ui/styles.css";
import { ReactFlowProvider } from "@xyflow/react";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CopilotKit publicApiKey="ck_pub_7a8c1c5e3306960a6ad534ff432ec65f">
        <ReactFlowProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ReactFlowProvider>
      </CopilotKit>
    </QueryClientProvider>
  </StrictMode>
);
