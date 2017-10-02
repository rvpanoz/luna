/**
 * Main component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Header from './package/Header';

import Semver from 'semver-compare';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
      activepkg: null
    }
    this.setActive = this.setActive.bind(this);
    this.needsUpdate = this.needsUpdate.bind(this);
    this.doAction = this.doAction.bind(this);
    this.install = this.install.bind(this);
    this.update = this.update.bind(this);
    this.uninstall = this.uninstall.bind(this);
  }
  setActive(pkg) {
    this.setState({
      activepkg: (pkg)
        ? pkg
        : null
    });
  }
  componentDidMount() {
    let root = this.refs.root;
    if (root) {
      ipcRenderer.on('view-by-version-reply', (event, data) => {
        this.setActive(data);
      });
      ipcRenderer.on('get-packages-reply', (event) => {
        this.setActive(null);
      });
      ipcRenderer.on('search-packages-reply', (event) => {
        this.setActive(null);
      });
      ipcRenderer.on('update-package-reply', (event, data) => {
        this.setActive(null);
      });
    }
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
      ipcRenderer.send('install-package', pkg.name);
    });
  }
  update(e) {
    e.preventDefault();
    let pkg = this.state.activepkg;

    this.showMessageBox({
      action: 'update',
      name: pkg.name
    }, () => {
      ipcRenderer.send('update-package', pkg.name);
    });
  }
  uninstall(e) {
    e.preventDefault();
    let pkg = this.props.pkg;

    this.showMessageBox({
      action: 'uninstall',
      name: pkg.name
    }, () => {
      ipcRenderer.send('uninstall-package', pkg.name);
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
    debugger;
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
                    <div className="author">
                      Author:&nbsp;{pkg.author}
                    </div>
                    <div className="detail-description">
                      {pkg.description}
                    </div>
                  </section>
                  <section id="contributors-content"></section>
                  <section id="dependencies-content"></section>
                </div>
              </div>
            </div>
          : null}
      </div>
    )
  }
}
