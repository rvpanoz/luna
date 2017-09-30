/**
 * App Component
 *
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './common/SearchBar';
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
    this.state = {
      loader: false,
      showMain: true,
      mode: 'global'
    }
    this.doSearch = this.doSearch.bind(this);
  }
  doSearch(pkgName) {
    if (pkgName) {
      this.setState({
        loader: true,
        mode: 'search'
      });
      ipcRenderer.send('search-packages', pkgName);
    }
    return false;
  }
  render() {
    return (
      <div className="wrapper" ref="root">
        <section className="sidebar ui inverted vertical left fixed list" ref="sidebar">
          <div className="item">
            <div className="header">Packages</div>
            <div className="search-bar">
              <SearchBar doSearch={this.doSearch}/>
            </div>
            <List loading={this.state.loader}/>
        </div>
        </section>
        <section className="content" ref="content">
          <Main mode={this.state.mode} />
        </section>
      </div>
    )
  }
}

ReactDOM.render(<App/>, rootEl);
