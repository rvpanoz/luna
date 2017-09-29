/**
 * List component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import utils from './../../utils';
import Loader from './../common/Loader';
import ListItem from './ListItem';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      packages: []
    }
    this.reload = this.reload.bind(this);
    this.updatePackages = this.updatePackages.bind(this);
  }
  reload(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.setActive(null);
    ipcRenderer.send('get-global-packages');
    this.setState({
      loader: true
    });
  }
  updatePackages(packages) {
    let root = this.refs.rootElement;
    let data = utils.parse(packages);

    this.setState({
      loader: false,
      packages: data
    }, () => {
      let first = data[0];
      if (first) {
        ipcRenderer.send('view-by-version', first.name, first.version);
      }
    });
  }
  componentDidMount() {
    //get global packages
    ipcRenderer.send('get-global-packages');

    //update packages data
    ipcRenderer.on('get-global-packages-reply', (event, packages) => {
      this.updatePackages(packages);
    });
  }
  componentWillUnmount() {
    // Removes listeners of the specified channel
    ipcRenderer.removeAllListeners(['get-global-packages-reply', 'uninstall-module-reply', 'update-package-reply', 'install-by-version-reply']);
  }
  render() {
    let packages = this.state.packages;
    if (!packages) {
      return null;
    }
    return (
      <Loader loading={this.state.loader}>
      <div className="packages-list" ref="rootElement">
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
      </Loader>
    )
  }
}
