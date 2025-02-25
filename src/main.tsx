import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { TodoProvider } from "./Context/TodoProvider";
import { MemoProvider } from "./Context/MemoProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoProvider>
      <MemoProvider>
        <App />
      </MemoProvider>
    </TodoProvider>
  </StrictMode>
);
