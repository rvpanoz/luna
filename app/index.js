import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from 'redux-react-hook';
import App from './containers/App';
import { configureStore, history } from './store/configureStore';

const store = configureStore();

render(
  <StoreProvider value={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;

    render(
      <StoreProvider value={store}>
        <NextApp />
      </StoreProvider>,
      document.getElementById('root')
    );
  });
}
