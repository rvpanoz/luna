/**
 * Starting point - index.js
 **/

"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./containers/App";
import "./app.global.css";

//see webpack.renderer.config for jquery
import Bootstrap from "bootstrap/dist/js/bootstrap.js";

const rootEl = document.getElementById("app-content");
const render = App => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootEl
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./containers/App", () => {
    const NextApp = require("./containers/App").default;
    render(NextApp);
  });
}
