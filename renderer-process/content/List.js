/**
 * List component
 *
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import utils from './../../utils';
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
    this.updatePackages = this.updatePackages.bind(this);
  }
  updatePackages(packages) {
    let data = utils.parse(packages);
    this.setState({
      packages: data, loader: false
    }, () => {
      let first = data[0];
      if(first) {
        ipcRenderer.send('view-by-version', first.name, first.version);
      }
    });
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
        <div className="packages-list">
          <h4 className="title">Global packages installed</h4>
          <div className="list-group">
            {packages.map((pkg, idx) => {
              return <ListItem idx={idx} key={idx} {...pkg}/>
            })}
          </div>
        </div>
      </AppLoader>
    )
  }
}
