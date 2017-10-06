import {ipcRenderer} from 'electron';
import React from 'react';
import Semver from 'semver-compare';

class PackageHeader extends React.Component {
  constructor(props) {
    super(props);
    this._needsUpdate = this._needsUpdate.bind(this);
    this._update = this._update.bind(this);
    this._install = this._install.bind(this);
    this._uninstall = this._uninstall.bind(this);
  }
  _needsUpdate() {
    let pkg = this.props.pkg,
      diff = 0;
    let latest = pkg['dist-tags'].latest;
    let installed = pkg.version;
    diff = Semver(latest, installed);
    return diff;
  }
  _install(e) {
    e.preventDefault();
    let pkg = this.props.pkg,
      version;
    let mode = this.props.mode;
    this.props.showMessageBox({
      action: 'Install',
      name: pkg.name,
      version: version || 'latest'
    }, () => {
      ipcRenderer.send('install-package', {
        scope: 'g',
        pkgName: pkg.name,
        version: version || 'latest'
      });
    });
  }
  _uninstall(e) {
    e.preventDefault();
    let pkg = this.props.pkg,
      version;
    let mode = this.props.mode;
    this.props.showMessageBox({
      action: 'Uninstall',
      name: pkg.name
    }, () => {
      this.props.setMode('global');
      ipcRenderer.send('uninstall-package', {
        scope: 'g',
        pkgName: pkg.name
      });
    });
  }
  _update(e) {
    e.preventDefault();
    let selectInput = this.refs.selectInput;
    let selectedVersion = selectInput.value;
    let pkg = this.props.pkg,
      version;
    console.log(selectedVersion)
    this.props.showMessageBox({
      action: 'Update',
      name: pkg.name,
      version: selectedVersion
    }, () => {
      this.props.setMode('global');
      ipcRenderer.send('update-package', {
        scope: 'g',
        pkgName: pkg.name,
        version: selectedVersion
      });
    });
  }
  componentDidMount() {
    ipcRenderer.on('uninstall-package-reply', (event, data) => {
      this.props.setActive(null);
      this.props.toggleLoader(true);
      ipcRenderer.send('get-packages', {scope: '-g'});
    });
    ipcRenderer.on('install-package-reply', (event, data) => {
      this.props.toggleLoader(true);
      ipcRenderer.send('get-packages', {scope: 'g'});
    });

    ipcRenderer.on('get-package-reply', (event, data) => {
      console.log(data);
    });

    ipcRenderer.on('update-package-reply', (event, data) => {
      this.props.setActive(null);
      this.props.toggleLoader(true);
      ipcRenderer.send('get-packages', {scope: 'g'});
    });
  }
  componentWillUnMount() {
    ipcRenderer.removeAllListeners('install-package-reply', 'update-package-reply', 'uninstall-package-reply');
  }
  render() {
    let pkg = this.props.pkg;
    if (!pkg) {
      return null;
    }
    return (
      <div className="flex-row" ref="root">
        <h1 className="ui header" style={{
          marginBottom: '0.25em'
        }}>
          {pkg.name}&nbsp;{pkg.version}
          <div className="sub header flex-row">
            <div className="latest" style={{
              marginBottom: '15px'
            }}>
              Latest:&nbsp;{pkg['dist-tags'].latest}&nbsp; {(this._needsUpdate())
                ? <a href="#" onClick={this._update}>Update</a>
                : ''}
            </div>
            <div className="versions">
              <select className="soflow" ref="selectInput">
                <option value="0">Select version</option>
                {pkg.versions.map((version, key)=>{
                  return <option value={version} key={key}>v{version}</option>
                })}
              </select>
            </div>
          </div>
        </h1>
        <div className="ui actions">
          {(this.props.mode !== 'search')
            ? <a className="button btn-red" href="#" onClick={this._uninstall}>Uninstall</a>
            : <a className="button btn-green" href="#" onClick={this._install}>Install</a>}
        </div>
      </div>
    )
  }
}

export default PackageHeader;
