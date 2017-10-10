import config from '../../../config';
import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Loader from '../../common/Loader';
import {StaticList} from '../../common/Statics';
import {showMessageBox, makeRequest} from '../../../utils';

class PackageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.install = this.install.bind(this);
    this.update = this.update.bind(this);
    this.uninstall = this.uninstall.bind(this);
    this.doAction = this.doAction.bind(this);
    this.onChangeVersion = this.onChangeVersion.bind(this);
  }
  doAction(e) {
    e.preventDefault();
    let target = e.currentTarget;
    let action = target.querySelector('span').innerHTML.toLowerCase();
    if (this[action]) {
      this[action]();
    }
    return false;
  }
  update() {
    let pkg = this.props.active;
    showMessageBox({
      action: 'UPDATE',
      name: pkg.name
    }, () => {
      ipcRenderer.send('update-package', {
        pkgName: pkg.name,
        scope: 'g'
      });
      this.props.toggleMainLoader(true)
    });
  }
  uninstall() {
    let pkg = this.props.active;
    showMessageBox({
      action: 'UNINSTALL',
      name: pkg.name
    }, () => {
      ipcRenderer.send('uninstall-package', {
        pkgName: pkg.name,
        scope: 'g'
      });
      this.props.toggleMainLoader(true);
    });
  }
  install() {
    let pkg = this.props.active,
      version;
    showMessageBox({
      action: 'INSTALL',
      name: pkg.name,
      version: version || 'latest'
    }, () => {
      ipcRenderer.send('install-package', {
        pkgName: pkg.name,
        scope: 'g',
        pkgVersion: version || 'latest'
      });
      this.props.toggleMainLoader(true)
    });
    return false;
  }
  onChangeVersion(e) {
    let target = e.currentTarget;
    let pkg = this.props.active;
    let version = target.value;

    if(version !== "0") {
      ipcRenderer.send('view-by-version', {
        pkgName: pkg.name,
        pkgVersion: version
      });
    }
    return false;
  }
  render() {
    let pkg = this.props.active;
    if (!pkg) {
      return null;
    }
    return (
      <div className="package-details" ref="root">
        <div className="package-details__head">
          <div className="package-details__title">
            {pkg.name}&nbsp;
            <span className="label label-success">v{pkg.version}</span>
          </div>
          <div className="package-details__settings dropdown">
            <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a href="#">
                  <span>Update</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="package-details__info">
          <div className="package-details__name">
            <span>Author:&nbsp;{pkg.author}</span>
            <br/>
            <span>Latest:&nbsp;v{pkg['dist-tags'].latest}</span>
            <br/>
            <br/>
            <div className="form-group">
              <label htmlFor="selectVersion">
                <span>Select version:</span>
              </label>
              <select onChange={this.onChangeVersion} className="form-control input-sm select-mini" id="selectVersion">
                <option value="0"> - </option>
                {pkg.versions.map((version, idx) => {
                  return <option key={idx} value={version}>{version}</option>
                })}
              </select>
            </div>
          </div>
          <div className="package-details__date"></div>
        </div>
        <div className="package-details__body">
          <div className="package-details__text">{pkg.description}</div>
          <div className="package-details__tabs tab-wrap">
            <input id="tab1" type="radio" name="tabs" defaultChecked/>
            <label htmlFor="tab1">DevDependencies</label>
            <input id="tab2" type="radio" name="tabs"/>
            <label htmlFor="tab2">Dependencies</label>
            <input id="tab3" type="radio" name="tabs"/>
            <label htmlFor="tab3">Contributors</label>
            <section id="devDependencies-content">
              <StaticList data={pkg.devDependencies}/>
            </section>
            <section id="dependencies-content">
              <StaticList data={pkg.dependencies}/>
            </section>
            <section id="contributors-content">
              <StaticList data={pkg.maintainers}/>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default PackageDetails;
