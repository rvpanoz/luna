/**
 * ItemDetails component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Semver from 'semver-compare';
import Loader from './../common/Loader';
import {OptionItems, StaticList} from './../common/Statics';

const OptionItem = (props) => {
  return (
    <option value={props.version}>{props.version}</option>
  )
}

export default class ItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      needsUpdate: false
    }
    this.install = this.install.bind(this);
    this.update = this.update.bind(this);
    this.uninstall = this.uninstall.bind(this);
  }
  update(e) {
    e.preventDefault();
    let pkg = this.props.pkg;
    remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      message: `This action will update ${pkg.name} to the latest version. \nAre you sure? `,
      buttons: ['OK', 'CANCEL']
    }, (btnIdx) => {
      switch (btnIdx) {
        case 0:
          ipcRenderer.send('update-package', pkg.name);
          this.setState({loader: true});
          break;
        default:
          return;
      }
    });
  }
  uninstall(e) {
    e.preventDefault();
    let pkg = this.props.pkg;

    remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      message: `This action will uninstall ${pkg.name} from your system. \nAre you sure? `,
      buttons: ['OK', 'CANCEL']
    }, (btnIdx) => {
      switch (btnIdx) {
        case 0:
          ipcRenderer.send('uninstall-package', pkg.name);
          this.setState({loader: true});
          break;
        default:
          return;
      }
    });
  }
  install(e) {
    if (e) {
      e.preventDefault();
    }
    let version = this.refs.selectVersion.value;
    if (version != '0') {
      let pkg = this.props.pkg;
      remote.dialog.showMessageBox(remote.getCurrentWindow(), {
        type: 'question',
        message: `This action will install ${pkg.name} ${version} to your system. \nAre you sure? `,
        buttons: ['OK', 'CANCEL']
      }, (btnIdx) => {
        switch (btnIdx) {
          case 0:
            ipcRenderer.send('install-by-version', pkg.name, version);
            this.setState({loader: true});
            break;
          default:
            return;
        }
      });
    }
    return false;
  }
  componentWillReceiveProps(nextProps) {
    let pkg = nextProps.pkg,
      diff = 0;

    if (pkg) {
      let latest = pkg['dist-tags'].latest;
      let installed = pkg.version;

      //compare versions
      diff = Semver(latest, installed);
      this.setState({
        loader: false,
        needsUpdate: (diff > 0)
          ? 1
          : 0
      });
    }
  }
  render() {
    let pkg = this.props.pkg;
    if (!pkg) {
      return null;
    }

    let latestVersion = pkg['dist-tags'].latest;
    let currentVersion = pkg.version;

    return (
      <Loader loading={this.state.loader}>
        <div className="package-details">
          <div className="detail tile">
            <section className="detail-body">
              <div className="detail-top">
                <h2 className="detail-heading">{pkg.name}</h2>
                <div className="flex-row">
                  <div className="version">
                    Latest:&nbsp;v{latestVersion}&nbsp;
                    <a href="#" className={(this.state.needsUpdate)
                      ? 'show'
                      : 'hide'} onClick={this.update}>Update</a>
                  </div>
                  <div className="versions">
                    Versions:&nbsp;
                    <select className="form-control" ref="selectVersion">
                      <option value="0">Select version</option>
                      {pkg.versions.map((version, idx) => {
                        return <OptionItem key={idx} version={version}/>
                      })}
                    </select>
                  </div>
                  <div className="actions">
                    <a onClick={this.install} href="#" className="btn btn-green btn-sm">Install</a>&nbsp;
                    <a onClick={this.uninstall} href="#" className="btn btn-red btn-sm">Uninstall</a>
                  </div>
                </div>
              </div>
              <div className="tab-wrap">
                <input id="tab1" type="radio" name="tabs" defaultChecked/>
                <label htmlFor="tab1">Details</label>
                <input id="tab2" type="radio" name="tabs"/>
                <label htmlFor="tab2">Contributors</label>
                <input id="tab3" type="radio" name="tabs"/>
                <label htmlFor="tab3">Dependencies</label>
                <section id="details-content">
                  <p className="detail-tags">{pkg.author}</p>
                  <div className="version">v{currentVersion}</div>
                  <div className="detail-description">
                    {pkg.description}
                  </div>
                </section>
                <section id="contributors-content">
                  <StaticList data={pkg.maintainers}/>
                </section>
                <section id="dependencies-content">
                  <StaticList data={pkg.dependencies}/>
                </section>
              </div>
            </section>
            <footer className="detail-footer">
              <ul className="detail-links">
                <li></li>
                <li></li>
              </ul>
            </footer>
          </div>
        </div>
      </Loader>
    )
  }
}
