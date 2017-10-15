import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {parse} from '../../utils';
import Loader from '../../common/Loader';
import PackageListItem from './PackagesListItem';
import styles from './Packages.css';

class PackagesList extends React.Component {
  constructor(props) {
    super(props);
    this._reload = this._reload.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
  }
  componentDidMount() {
    /**
    * Show loader
    **/
    this.props.toggleLoader(true);

    /**
    * ipcRenderer event
    * Get installed packages
    **/
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      params: ['g', 'long']
    });

    /**
    * ipcRenderer listener
    * Set active package
    **/
    ipcRenderer.on('view-package-reply', (event, pkg) => {
      let pkgData;
      try {
        pkgData = JSON.parse(pkg);
      } catch (e) {
        throw new Error(e)
      }

      if(pkgData) {
        this.props.setActive(pkgData, false);
      }
    });

    /**
    * Reload
    **/
    ipcRenderer.on('install-package-reply', (event, pkg) => {
      this._reload();
    });
    ipcRenderer.on('uninstall-package-reply', (event, pkg) => {
      this._reload();
    });
    ipcRenderer.on('update-package-reply', (event, pkg) => {
      this._reload();
    });

    /**
    * ipcRenderer listener
    * Set packages from npm list
    **/
    ipcRenderer.on('get-packages-close', (event, packagesString) => {
      let packages = parse(packagesString, 'dependencies');
      this.props.setPackages(packages);
      this.props.toggleLoader(false);
      this.props.setMode('GLOBAL');
    });

    /**
    * ipcRenderer listener
    * Set errorMessage from npm list stderr output
    **/
    ipcRenderer.on('get-packages-error', (event, errorMessage) => {
      console.error(errorMessage);
      this.props.setAppMessage(errorMessage, true);
    });

    /**
    * ipcRenderer listener
    * Set packages from npm search <pkgname>
    **/
    ipcRenderer.on('search-packages-close', (event, packagesString) => {
      let packages = parse(packagesString, 'dependencies');
      this.props.setAppMessage(null, false);
      this.props.setPackages(packages);
      this.props.setMode('SEARCH', ['Install']);
      this.props.toggleLoader(false);
    });
  }
  componentWillUnMount() {
    ipcRenderer.removeAllListeners([
      'get-packages-close',
      'search-packages-close',
      'get-packages-error'
    ]);
  }
  //@private
  _reload() {
    this.props.setAppMessage(null, false);
    this.props.toggleLoader(true);
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      params: ['g', 'long']
    });
  }
  deselectAll() {
    let list = this.refs.list;
    if (list) {
      let selected = list.querySelector('.selected');
      if (selected) {
        selected.classList.remove('selected');
      }
    }
  }
  render() {
    let packages = this.props.packages;
    return (
      <Loader loading={this.props.loading}>
        <div className={styles.packages__list} ref="list">
          {(packages)
            ? packages.map((pkg, idx) => {
              let hasPeerMissing = pkg.peerMissing;
              if (hasPeerMissing) {
                return;
              }
              let version = pkg.version;
              let name = (pkg.from)
                ? pkg.from.split("@")[0]
                : pkg.name;
              return <PackageListItem deselectAll={this.deselectAll} idx={idx} key={idx} name={name} description={pkg.description} version={version}/>
            })
            : null}
        </div>
      </Loader>
    )
  }
}

export default PackagesList;
