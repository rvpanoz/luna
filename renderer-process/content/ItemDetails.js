/**
 * ItemDetails component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Semver from 'semver-compare';
import AppLoader from './../common/AppLoader';
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
      loader: false,
      needsUpdate: false
    }
    this.install = this.install.bind(this);
    this.update = this.update.bind(this);
    this.uninstall = this.uninstall.bind(this);
  }
  update(e) {
    e.preventDefault();
    let pkg = this.props.packageItem;
    remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      message: `This action will update ${pkg.name} to the latest version. \nAre you sure? `,
      buttons: ['OK', 'CANCEL']
    }, (btnIdx) => {
      switch (btnIdx) {
        case 0:
          this.setState({loader: true});
          ipcRenderer.send('update-package', pkg.name);
          break;
        default:
          return;
      }
    });
  }
  uninstall(e) {
    e.preventDefault();
    let packageItem = this.props.packageItem;

    remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      message: `This action will uninstall ${packageItem.name} from your system. \nAre you sure? `,
      buttons: ['OK', 'CANCEL']
    }, (btnIdx) => {
      switch (btnIdx) {
        case 0:
          this.setState({loader: true});
          ipcRenderer.send('uninstall-package', packageItem.name);
          break;
        default:
          return;
      }
    });
  }
  install(e) {
    if(e) {
      e.preventDefault();
    }
    let version = this.refs.selectVersion.value;
    if(version) {
      let pkg = this.props.packageItem;
      remote.dialog.showMessageBox(remote.getCurrentWindow(), {
        type: 'question',
        message: `This action will install ${pkg.name} ${version} to your system. \nAre you sure? `,
        buttons: ['OK', 'CANCEL']
      }, (btnIdx) => {
        switch (btnIdx) {
          case 0:
            this.setState({loader: true});
            let pkgName = pkg.name;
            ipcRenderer.send('install-by-version', pkgName, version);
            break;
          default:
            return;
        }
      });
    }
    return false;
  }
  componentWillReceiveProps(props) {
    let pkg = props.packageItem,
      diff = 0;
    if (pkg) {
      let latest = pkg['dist-tags'].latest;
      let installed = pkg.version;

      //compare versions
      diff = Semver(latest, installed);
      this.setState({
        needsUpdate: (diff > 0)
          ? 1
          : 0
      });
    }
  }
  componentDidMount() {
    ipcRenderer.on('update-package-reply', (event) => {
      this.setState({loader: false});
    });
    ipcRenderer.on('install-by-version-reply', (event) => {
      this.setState({loader: false});
    });
    ipcRenderer.on('uninstall-package-reply', (event) => {
      this.setState({loader: false});
    });
  }
  render() {
    let pkg = this.props.packageItem;
    if (!pkg) {
      return null;
    }

    let latestVersion = pkg['dist-tags'].latest;
    let currentVersion = pkg.version;

    return (
      <AppLoader loading={this.state.loader}>
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
      </AppLoader>
    )
  }
}
