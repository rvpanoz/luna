/**
 * Packages component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import AppLoader from './../common/AppLoader';
import List from './../content/List';
import PackageDetails from './../content/PackageDetails';

class Packages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      package: null
    }
    this.setActive = this.setActive.bind(this);
  }
  setActive(pkg) {
    this.setState({
      package: pkg
    });
  }
  componentDidMount() {
    ipcRenderer.on('view-by-version-reply', (event, pkg) => {
      let root = this.refs.root;
      if(root) {
        this.setActive(pkg);
      }
    });
  }
  componentDidUpdate() {
    let root = this.refs.root;
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners('view-by-version-reply');
  }
  render() {
    // <AppLoader loading={this.state.loader}></AppLoader>
    return (
      <div className="packages-page" ref="root">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
            <List setActive={this.setActive}/>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
            <PackageDetails pkg={this.state.package} setActive={this.setActive}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Packages;
