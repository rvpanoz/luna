import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "redux-react-hook";
import App from "./App";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <StoreProvider value={store}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
