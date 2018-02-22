/**
 * Root Component
 *
 */

import React from "react";
import { Provider } from "react-redux";
import Reboot from "material-ui/Reboot";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import Layout from "./Layout";
import { themeA } from "../themes";

const AppTheme = themeA();

const App = (props) => {
  const { store } = props;
  const theme = createMuiTheme(themeA);
  console.log(theme);

  return (
    <section id="root">
      <Reboot />
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Layout />
        </MuiThemeProvider>
      </Provider>
    </section>
  );
};

export default App;
