/**
 * App Component
 *
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';

import List from './content/List';
import Main from './content/Main';

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
    console.log('App render');
    return (
      <div className="wrapper">
        <section className="sidebar ui inverted vertical left fixed list" ref="sidebar">
          <List />
        </section>
        <section className="content" ref="content">
          <Main />
        </section>
      </div>
    )
  }
}

ReactDOM.render(<App/>, rootEl);
