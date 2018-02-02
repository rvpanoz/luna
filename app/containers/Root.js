/**
 * Root Component
 */

import React from 'react';
import { Provider } from 'react-redux';
import Reboot from 'material-ui/Reboot';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import Layout from './Layout';

const fontWeightMedium = 500;
const App = (props) => {
  const { store } = props;
  const muiTheme = createMuiTheme({
    palette: {
      type: 'light'
    },
    typography: {
      // Use the system font.
      fontFamily:
				'-apple-system,system-ui,BlinkMacSystemFont,' +
				'"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
      fontWeightMedium,
      body1: {
        fontWeight: fontWeightMedium
      },
      button: {
        fontStyle: 'italic'
      }
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
};

export default App;
