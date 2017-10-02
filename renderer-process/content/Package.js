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
    this.setActive = this.setActive.bind(this);
    this.needsUpdate = this.needsUpdate.bind(this);
    this.doAction = this.doAction.bind(this);
    this.install = this.install.bind(this);
    this.update = this.update.bind(this);
    this.uninstall = this.uninstall.bind(this);
  }
  _addListeners() {
    const listeners = ['view-by-version-reply', 'get-packages-reply', 'search-packages-reply', 'update-package-close'];
    listeners.forEach((listener) => {
      ipcRenderer.on(listener, (event, data) => {
        switch (listener) {
          case 'get-packages-reply':
            this.setActive(null, false);
            break;
          case 'update-package-reply':
            this.setActive(null, false);
            break;
          case 'search-packages-reply':
            this.setActive(null, false);
            break;
          case 'view-by-version-reply':
            this.setActive(data);
          default:
        }
      });
    });
  }
  _removeListeners() {
    ipcRenderer.removeAllListeners(listeners);
  }
  setActive(pkg, loader) {
    this.setState({
      loader: (loader && loader === true) ? loader : false,
      activepkg: (pkg)
        ? pkg
        : null
    }, () => {
      if(pkg) {
        ipcRenderer.send('get-package', {
          pkgName: pkg.name,
          scope: 'g'
        });
      }
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
  install(e) {
    if (e) {
      e.preventDefault();
    }
    let pkg = this.state.activepkg;
    this.showMessageBox({
      action: 'install',
      name: pkg.name
    }, () => {
      ipcRenderer.send('install-package', {
        scope: 'g',
        pkgName: pkgName,
        version: 'latest'
      });
    });
  }
  update(e) {
    e.preventDefault();
    let pkg = this.state.activepkg;
    this.showMessageBox({
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
  uninstall(e) {
    e.preventDefault();
    let pkg = this.props.pkg;
    this.showMessageBox({
      action: 'uninstall',
      name: pkg.name
    }, () => {
      ipcRenderer.send('uninstall-package', {
        scope: 'g',
        pkgName: pkgName
      });
      this.setState({loader: true});
    });
  }
  showMessageBox(opts, cb) {
    let pkgName = opts.name;
    let action = opts.action;

    remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      message: `This action will ${action} ${pkgName} ${(opts.version) ? opts.version : ''}. \nAre you sure? `,
      buttons: ['OK', 'CANCEL']
    }, (btnIdx) => {
      switch (btnIdx) {
        case 0:
          if(cb) {
            cb();
          }
          break;
        default:
          return;
      }
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
  doAction(e) {
    e.preventDefault();
    let mode = this.state.mode;
    let pkg = this.state.activepkg;
    switch (mode) {
      case 'global':
        ipcRenderer.send('uninstall-package', pkg.name);
        break;
      case 'search':
        ipcRenderer.send('install-package', pkg.name);
        break;
      default:
    }
    return false;
  }
  render() {
    let pkg = this.state.activepkg;
    let visible = this.props.visible;
    return (
      <Loader loading={this.state.loader}>
      <div className="main" ref="root">
        {(pkg && visible)
          ? <div className="ui container">
              <div className="ui basic padded segment">
                <Header pkg={pkg} needsUpdate={this.needsUpdate} update={this.update} mode={this.state.mode}/>
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
                    <Details pkg={pkg} />
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
