import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Layout from './Layout';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
