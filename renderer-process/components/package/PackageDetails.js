import config from '../../../config';
import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Loader from '../../common/Loader';
import PackageActions from './PackageActions';
import PackageTabs from './PackageTabs';
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
      this.props.toggleMainLoader(true);
    });
    return false;
  }
  onChangeVersion(e) {
    let target = e.currentTarget;
    let pkg = this.props.active;
    let version = target.value;

    if (version !== "0") {
      this.props.toggleMainLoader(true);
      ipcRenderer.send('view-by-version', {
        pkgName: pkg.name,
        pkgVersion: version
      });
    }
    return false;
  }
  componentDidUpdate(prevProps, prevState) {
    let pkg = this.props.active;
    if (pkg && pkg.name) {
      ipcRenderer.send('get-package', {
        pkgName: pkg.name,
        scope: 'g'
      });
    }
  }
  componentDidMount() {
    ipcRenderer.on('view-by-version-reply', (event, pkg) => {
      this.props.setActive(pkg, false);
    });

    //TODO
    // ipcRenderer.on('get-package-reply', (event, pkg) => {
    //   console.log(pkg);
    // });
  }
  componentWillUnMount() {
    ipcRenderer.removeAllListeners('view-by-version-reply');
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
          <div className="package-details__actions">
            <PackageActions mode={this.props.mode} />
          </div>
        </div>
        <div className="package-details__info">
          <div className="form-group">
            <label htmlFor="selectVersion">
              <span>Select version</span>
            </label>
            <select onChange={this.onChangeVersion} className="form-control input-sm select-mini" ref="selectVersion">
              <option value="0">-</option>
              {pkg.versions.map((version, idx) => {
                return <option key={idx} value={version}>{version}</option>
              })}
            </select>
          </div>
          <div className="package-details__date"></div>
        </div>
        <div className="package-details__body">
          <Loader loading={this.props.isLoading}>
            <PackageTabs pkg={pkg} />
          </Loader>
        </div>
      </div>
    )
  }
}

export default PackageDetails;
