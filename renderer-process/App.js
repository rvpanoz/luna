/**
 * App Component
 *
 */

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import {PropTypes} from 'prop-types';
import {HashRouter as Router} from 'react-router-dom';

import Bootstrap from 'bootstrap/dist/js/bootstrap.min';
import Sidebar from './common/Sidebar';
import Main from './content/Main';

//configuration and store globals
const config = remote.getGlobal('config');
const store = remote.getGlobal('store');

//dev mode on
require('./development/imports.js');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <Main />
      </div>
    )
  }
}

// https://github.com/reactjs/react-router-tutorial/tree/master/lessons/12-navigating
App.contextTypes = {
  router: PropTypes.object
};

ReactDOM.render(
  <Router><App/></Router>, document.getElementById('app-content'));
