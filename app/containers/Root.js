import React from 'react';
import { StoreProvider } from 'redux-react-hook';
import App from './App';
import Layout from './Layout';

const Root = props => {
  const { store } = props;

  return (
    <StoreProvider value={store}>
      <App>
        <Layout />
      </App>
    </StoreProvider>
  );
};

export default Root;
