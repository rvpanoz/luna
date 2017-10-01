/**
 * Main component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Semver from 'semver-compare';

const ActionButton = (props) => {
  let mode = props.mode,
    el;
  let text = 'Uninstall';
  let className = '';

  switch (mode) {
    case 'global':
      className = 'button-red';
      break;
    default:
      className = 'button-green';
      text = 'Install'
  }

  return (
    <button className={`button ${className}`} href="#">{text}</button>
  )
}

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
      activepkg: null
    }
    this.setActive = this.setActive.bind(this);
    this.needsUpdate = this.needsUpdate.bind(this);
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
  componentWillReceiveProps(props) {

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
    }
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
  render() {
    let pkg = this.state.activepkg;
    let visible = this.props.visible;
    return (
      <div className="main" ref="root">
        {(pkg && visible)
          ? <div className="ui container">
              <div className="ui basic padded segment">
                <div className="flex-row">
                  <h1 className="ui header" style={{
                    marginBottom: '0.25em'
                  }}>
                    {pkg.name}&nbsp;v{pkg.version}
                    <div className="sub header">
                      Latest:&nbsp;v{pkg['dist-tags'].latest}&nbsp;
                      {(this.needsUpdate() > 0) ? <a href="#" onClick={this.update}>Update</a> : ''}
                    </div>
                  </h1>
                  <div className="ui actions">
                    <ActionButton mode={this.props.mode}/>
                  </div>
                </div>
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
