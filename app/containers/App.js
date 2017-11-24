/**
 * App Component
 */

'use strict';

import { remote, ipcRenderer } from 'electron';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';
import SidebarContainer from './SidebarContainer';
import AppHeader from '../common/AppHeader';
import PackagesContainer from './PackagesContainer';

const store = configureStore();
const rootEl = document.getElementById('app-content');

const App = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <AppHeader/>
        <div className="dashboard">
          <SidebarContainer/>
          <div className="container main">
            <div className="main__cont main__scroll">
              <PackagesContainer />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default App;
