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
import {Route} from 'react-router-dom';

import AppHeader from '../containers/AppHeader';
import SidebarContainer from '../containers/SidebarContainer';
import Dashboard from '../components/Dashboard';
import Analyze from '../containers/AnalyzePage';
import PackagesPage from '../containers/PackagesPage';

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
        <AppHeader title="Luna"/>
        <div className="dashboard">
          <SidebarContainer/>
          <div className="main">
            <div className="main__scroll">
              <div className="main__cont">
                <Route exact path="/" component={Dashboard}/>
                <Route path="/packages" component={PackagesPage}/>
                <Route path="/analyze" component={Analyze}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
