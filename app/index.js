import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import {HashRouter as Router, Route} from 'react-router-dom';

const rootEl = document.getElementById('app-content');

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Router><Component/></Router>
    </AppContainer>, rootEl);
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/App', () => {
      const NextApp = require('./containers/App').default;
      render(NextApp);
    });
}
