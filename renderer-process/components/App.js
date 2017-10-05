/**
 * App Component
 *
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store';

import SearchBoxContainer from '../containers/SearchBoxContainer';
import PackageContainer from '../containers/PackageContainer';
import PackagesContainer from '../containers/PackagesContainer';

//configuration and store globals
const config = remote.getGlobal('config');
const electronStore = remote.getGlobal('store');
const store = configureStore();
const rootEl = document.getElementById('app-content');

//dev mode on
require('../development/imports.js');

const App = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <section className="sidebar ui inverted vertical left fixed list">
          <div className="item">
            <div className="search-bar">
              <SearchBoxContainer />
            </div>
            <div className="header">Packages</div>
            <PackagesContainer />
          </div>
        </section>
        <section className="content">
          <PackageContainer />
        </section>
      </div>
    </Provider>
  );
}

export default App;
