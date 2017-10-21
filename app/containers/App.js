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
import {HashRouter as Router, Route} from 'react-router-dom';

//container components
import SidebarContainer from './SidebarContainer';
import AppHeader from '../common/AppHeader';
import PackagesContainer from './PackagesContainer';

const store = configureStore();
const rootEl = document.getElementById('app-content');

const App = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <AppHeader title="Luna"/>
        <div className="dashboard">
          <SidebarContainer items={['fa-bars', 'fa-feed', 'fa-cog']}/>
          <div className="main">
            <div className="main__scroll">
              <div className="main__cont">
                <Router>
                  <Route exact path="/" component={PackagesContainer}/>
                </Router>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
