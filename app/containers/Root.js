/**
 * Root Component
 *
 */

import { Provider } from "react-redux";
import { themeA } from "../themes";
import React from "react";
import CssBaseline from "material-ui/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import Layout from "./Layout";

const App = (props) => {
  const { store } = props;
  const theme = createMuiTheme(themeA);

  return (
    <section id="root">
      <CssBaseline />
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Layout />
        </MuiThemeProvider>
      </Provider>
    </section>
  );
};

export default App;
