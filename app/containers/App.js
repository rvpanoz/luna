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

// import AppMessageContainer from '../containers/AppMessageContainer';
import SidebarContainer from './SidebarContainer';
import PackagesContainer from './PackagesContainer';
//

// //configuration and store globals
// const config = remote.getGlobal('config');
// const electronStore = remote.getGlobal('store');
const store = configureStore();
const rootEl = document.getElementById('app-content');

//dev mode on
require('../development/imports.js');

const App = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <div className="dashboard">
          <SidebarContainer/>
          <div className="main">
            <div className="main__scroll">
              <div className="main__cont">
                <Route exact path="/" component={PackagesContainer}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
