import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from 'redux-react-hook';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

const store = configureStore();

render(
  <StoreProvider value={store}>
    <Root history={history} />
  </StoreProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;

    render(
      <StoreProvider value={store}>
        <NextRoot history={history} />
      </StoreProvider>,
      document.getElementById('root')
    );
  });
}
