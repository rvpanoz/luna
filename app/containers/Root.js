/**
 * Root Component
 *
 */

import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import main from "../themes/main";
import React from "react";
import CssBaseline from "material-ui/CssBaseline";
import Layout from "./Layout";

const App = props => {
  const { store } = props;
  const theme = createMuiTheme(main);

  return (
    <section id="container">
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
