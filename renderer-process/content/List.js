/**
 * List component
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
    this.reload = this.reload.bind(this);
    this.updatePackages = this.updatePackages.bind(this);
  }
  reload(e) {
    if(e) {
      e.preventDefault();
    }
    this.setState({
      loader: true
    }, () => {
      this.props.setActive(null);
      ipcRenderer.send('get-global-packages');
    });
  }
  updatePackages(packages) {
    if (!packages) {
      this.setState({loader: false})
      return;
    };
    let data = utils.parse(packages);
    this.setState({
      packages: data,
      loader: false
    }, () => {
      let first = data[0];
      if (first) {
        ipcRenderer.send('view-by-version', first.name, first.version);
      }
    });
  }
  componentDidMount() {
    this.setState({
      loader: true
    }, () => {
      ipcRenderer.send('get-global-packages');
    });
    ipcRenderer.on('get-global-packages-reply', (event, packages) => {
      this.updatePackages(packages);
    });
    ipcRenderer.on('uninstall-package-reply', (event, result) => {
      this.reload();
    });
    ipcRenderer.on('update-package-reply', (event, result) => {
      this.reload();
    });
    ipcRenderer.on('install-by-version-reply', (event, result) => {
      this.reload();
    })
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners(['get-global-packages-reply', 'uninstall-module-reply']);
  }
  render() {
    let packages = this.state.packages;
    return (
      <AppLoader loading={this.state.loader}>
        <div className="packages-list" ref="root">
          <div className="flex-row">
            <h4 className="title">Global packages installed</h4>
            <div className="refresh text-center">
              <a onClick={this.reload} title="Update list">
                <span className="fa fa-refresh"></span>
              </a>
            </div>
          </div>
          <div className="list-group">
            {(packages && packages.length)
              ? packages.map((pkg, idx) => {
                return <ListItem idx={idx} key={idx} {...pkg}/>
              })
              : null}
          </div>
        </div>
      </AppLoader>
    )
  }
}
