import { configureStore, history } from './store';
import { render } from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import './index.global.css';

const store = configureStore();
const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>, rootEl
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root');
    render(
      <AppContainer>
          <NextRoot store={store} history={history} />
      </AppContainer>, rootEl
    );
  });
}
