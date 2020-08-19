import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { StoreContext } from 'redux-react-hook';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import './app.global.css';

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./containers/App').default;

  render(
    <StoreContext.Provider value={store}>
      <AppContainer>
        <Root store={store} history={history} />
      </AppContainer>
    </StoreContext.Provider>,
    document.getElementById('root')
  );
});
