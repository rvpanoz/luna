/**
 * App Component
 */

"use strict";

import React from "react";
import { Provider } from "react-redux";
import Reboot from "material-ui/Reboot";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import Layout from "./Layout";

export default function App(props) {
  const { store } = props;
  const muiTheme = createMuiTheme({
    palette: {
      type: "light"
    }
  });

  return (
    <section>
      <Reboot />
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <Layout />
        </MuiThemeProvider>
      </Provider>
    </section>
  );
}
