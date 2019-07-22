/* eslint-disable global-require */

import React from 'react';
import ReactDom from 'react-dom';
import { StoreContext } from 'redux-react-hook';
import configureStore from './store/configureStore';
import App from './containers/App';

const store = configureStore();

ReactDom.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;

    ReactDom.render(
      <StoreContext.Provider value={store}>
        <NextApp />
      </StoreContext.Provider>,
      document.getElementById('app')
    );
  });
}
