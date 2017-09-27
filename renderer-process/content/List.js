/**
 * List component
 *
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import AppLoader from './../common/AppLoader';
import ListItem from './ListItem';

class SearchBar extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="input-group">
          <span className="input-group-addon">
            <i className=" fa fa-search"></i>
          </span>
          <input className="form-control" name="search" placeholder="search" autoFocus="autofocus" type="search" id="search-user"></input>
        </div>
      </div>
    )
  }
}

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      packages: []
    }
    this.clearSelection = this.clearSelection.bind(this);
    this.updatePackages = this.updatePackages.bind(this);
  }
  clearSelection() {
    //todo..
  }
  updatePackages(packages) {
    let data = this.parse(packages);
    this.setState({
      packages: data, loader: false
    }, () => {
      let first = data[0];
      if(first) {
        ipcRenderer.send('get-info-by-version', first.name, first.version);
      }
    });
  }
  parse(data) {
    let packages = data.dependencies;
    let arr = [];
    for (let z in packages) {
      let mod = {
        name: z,
        version: packages[z].version
      }
      arr.push(mod);
    }
    return arr;
  }
  componentWillMount() {
    this.setState({
      loader: true
    }, () => {
      ipcRenderer.send('get-global-packages');
    });
  }
  componentDidMount() {
    ipcRenderer.on('get-global-packages-reply', (event, packages) => {
      this.updatePackages(packages);
    });
    ipcRenderer.on('uninstall-module-reply', (event, result) => {
      console.log(result);
    });
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners(['get-global-packages-reply', 'uninstall-module-reply']);
  }
  render() {
    let packages = this.state.packages;
    if (!packages.length && this.state.loader == false) {
      return null;
    }
    return (
      <AppLoader loading={this.state.loader}>
        <div className="packages-list" ref={(el)=>{
            this.rootElement = el;
          }}>
          <h6 className="title">Global packages installed</h6>
          <div className="list-group">
            {packages.map((pkg, idx) => {
              return <ListItem clearSelection={this.clearSelection} idx={idx} key={idx} {...pkg}/>
            })}
          </div>
        </div>
      </AppLoader>
    )
  }
}
