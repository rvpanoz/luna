/**
 * List component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Loader from './../common/Loader';
import ListItem from './ListItem';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: this.props.loader || true,
      packages: []
    }
    this.updatePackages = this.updatePackages.bind(this);
  }
  componentWillReceiveProps(props) {
    let loader = props.loading;
    if(loader && loader == true) {
      this.setState({
        loader: loader
      });
    }
  }
  componentWillMount() {
    ipcRenderer.send('get-packages');
  }
  componentDidMount() {
    ipcRenderer.on('get-packages-reply', (event, packages) => {
      this.updatePackages(packages);
    });
    ipcRenderer.on('search-packages-close', (event, packages) => {
      this.updatePackages(packages);
    });
  }
  updatePackages(packages) {
    let data = JSON.parse(packages);
    this.setState({
      loader: false
    });
    if (this.refs.list) {
      this.setState({
        packages: (data.dependencies)
          ? Object.keys(data.dependencies).map(function(key) {
            return data.dependencies[key];
          })
          : Object.keys(data).map(function(key) {
            return data[key];
          })
      });
    }
  }
  render() {
    let packages = this.state.packages;
    return (
      <Loader loading={this.state.loader}>
        <div className="list" ref="list">
          {(packages && packages.length)
            ? packages.map((pkg, idx) => {
              pkg.name = (pkg.from)
                ? pkg.from.split("@")[0]
                : pkg.name;
              return <ListItem idx={idx} key={idx} {...pkg}/>
            })
            : null}
        </div>
      </Loader>
    )
  }
}
