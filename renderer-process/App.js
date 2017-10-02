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
import Main from './content/Package';

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
      mode: 'global',
      showMain: true
    }
    this.doSearch = this.doSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }
  componentDidMount() {
    let root = this.refs.root;
    if(root) {
      ipcRenderer.on('get-packages-reply', (event) => {
        this.setState({
          loader: false,
          showMain: true,
          mode: 'global'
        });
      });
      ipcRenderer.on('search-packages-reply', (event) => {
        this.setState({
          loader: false,
          showMain: true,
          mode: 'search'
        });
      });
    }
  }
  doSearch(pkgName) {
    if (pkgName) {
      this.setState({
        loader: true,
        showMain: false,
        mode: 'search'
      }, () => {
        ipcRenderer.send('search-packages', {
          pkgName: pkgName
        });
      });
    }
    return false;
  }
  clearSearch() {
    this.setState({
      showMain: false,
      loader: true,
      mode: 'global'
    });
    ipcRenderer.send('get-packages');
  }
  render() {
    return (
      <div className="wrapper" ref="root">
        <section className="sidebar ui inverted vertical left fixed list" ref="sidebar">
          <div className="item">
            <div className="search-bar">
              <SearchBar doSearch={this.doSearch} clearSearch={this.clearSearch}/>
            </div>
            <div className="header">Packages</div>
            <List loading={this.state.loader}/>
        </div>
        </section>
        <section className="content" ref="content">
          <Main mode={this.state.mode} visible={this.state.showMain}/>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<App/>, rootEl);
