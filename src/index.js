import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'redux-react-hook';
import App from './App';
import configureStore from './store';

const store = configureStore();
const Document = document; // eslint-disable-line no-undef

ReactDOM.render(
  <StoreProvider value={store}>
    <App />
  </StoreProvider>,
  Document.getElementById('root')
);
