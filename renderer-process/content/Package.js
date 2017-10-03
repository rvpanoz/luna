/**
 * Main component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {parse} from './../../utils';
import Header from './package/Header';
import Details from './package/Details';
import Semver from 'semver-compare';
import Loader from './../common/Loader';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      activepkg: null,
      mode: this.props.mode
    }
    this._addListeners = this._addListeners.bind(this);
    this._removeListeners = this._removeListeners.bind(this);
    this.setActive = this.setActive.bind(this);
    this.needsUpdate = this.needsUpdate.bind(this);
    this.update = this.update.bind(this);
  }
  _addListeners() {
    const listeners = ['view-by-version-reply', 'get-packages-reply', 'search-packages-reply', 'update-package-close'];
    listeners.forEach((listener) => {
      ipcRenderer.on(listener, (event, data) => {
        if(listener === 'view-by-version-reply') {
          this.setActive(data, false);
        } else {
          this.setActive(null, false);
        }
      });
    });
  }
  _removeListeners() {
    ipcRenderer.removeAllListeners(listeners);
  }
  setActive(pkg, loader) {
    this.setState({
      loader: (loader) ? loader : false,
      activepkg: (pkg)
        ? pkg
        : null
    }, () => {
      //todo..
    });
  }
  componentDidMount() {
    let root = this.refs.root;
    if (root) {
      this._addListeners();
    }
  }
  componentWillUnmount() {
    this._removeListeners();
  }
  update(e) {
    e.preventDefault();
    let pkg = this.state.activepkg;
    this.props.showMessageBox({
      action: 'update',
      name: pkg.name
    }, () => {
      ipcRenderer.send('update-package', {
        scope: 'g',
        pkgName: pkgName,
        version: 'latest'
      });
    });
  }
  needsUpdate() {
    let pkg = this.state.activepkg,
      diff = 0;
    let latest = pkg['dist-tags'].latest;
    let installed = pkg.version;
    diff = Semver(latest, installed);
    return diff;
  }
  render() {
    let pkg = this.state.activepkg;
    let isVisible = this.props.visible;

    return (
      <Loader loading={this.state.loader}>
        <div className="main" ref="root">
          {(pkg && isVisible)
            ? <div className="ui container">
                <div className="ui basic padded segment">
                  <Header pkg={pkg} needsUpdate={this.needsUpdate} update={this.update} />
                </div>
                <div className="ui basic padded segment">
                  <div className="tab-wrap">
                    <input id="tab1" type="radio" name="tabs" defaultChecked/>
                    <label htmlFor="tab1">Details</label>
                    <input id="tab2" type="radio" name="tabs"/>
                    <label htmlFor="tab2">Contributors</label>
                    <input id="tab3" type="radio" name="tabs"/>
                    <label htmlFor="tab3">Dependencies</label>
                    <section id="details-content">
                      <Details pkg={pkg}/>
                    </section>
                    <section id="contributors-content"></section>
                    <section id="dependencies-content"></section>
                  </div>
                </div>
              </div>
            : null}
        </div>
      </Loader>
    )
  }
}
