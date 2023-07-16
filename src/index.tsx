import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { Application } from "./Application";
import { initStore } from "./store";

import "./index.css";
const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  const store = initStore();

  root.render(
    <HashRouter>
      <Provider store={store}>
        <Application />
      </Provider>
    </HashRouter>
  );
}
