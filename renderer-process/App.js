/**
 * App Component
 *
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import Sidebar from './common/Sidebar';
import Main from './Main';

//configuration and store globals
const config = remote.getGlobal('config');
const electronStore = remote.getGlobal('store');
const rootEl = document.getElementById('app-content');

//dev mode on
require('./development/imports.js');

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar/>
        <section className="content">
          <div className="columns">
            <div className="main">
              <Main/>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

ReactDOM.render(
  <Router><App/></Router>, rootEl);
