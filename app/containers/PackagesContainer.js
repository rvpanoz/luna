'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {parse} from '../utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import PackagesListHeader from '../components/packages/PackagesListHeader';
import PackagesListSearch from '../components/packages/PackagesListSearch';
import PackagesList from '../components/packages/PackagesList';
import PackageContainer from '../containers/PackageContainer';

class PackagesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.reload = this.reload.bind(this);
  }
  reload(e) {
    if(e) {
      e.preventDefault();
    }
    this.props.actions.toggleLoader(true);
    this.props.actions.clearMessages();
    this.props.actions.setActive(null);
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      params: ['g', 'long']
    });
  }
  componentDidMount() {
    /**
    * ipcRenderer event
    * Get installed packages
    **/
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      params: ['g', 'long', 'parseable']
    });

    /**
    * ipcRenderer listener
    * Set packages from npm list
    **/
    ipcRenderer.on('get-packages-close', (event, packagesString) => {
      let packages = parse(packagesString, 'dependencies');
      this.props.actions.setPackages(packages);
      this.props.actions.setMode('GLOBAL');
      this.props.actions.toggleLoader(false);
    });

    /**
    * ipcRenderer listener
    * Set errorMessage from npm list stderr output
    **/
    ipcRenderer.on('get-packages-error', (event, errorMessage) => {
      //split errorMessage by new line(new error)
      let errorLinesArr = errorMessage.match(/[^\r\n]+/g);
      errorLinesArr.forEach((errorStr, idx) => {
        this.props.actions.addMessage('error', errorStr);
      });
    });

    /**
    * ipcRenderer listener
    * Set packages from npm search <pkgname>
    **/
    ipcRenderer.on('search-packages-close', (event, packagesString) => {
      let packages = parse(packagesString, 'dependencies');
      this.props.actions.setPackages(packages);
      this.props.actions.setMode('SEARCH', ['Install']);
      this.props.actions.toggleLoader(false);
    });

    // set active package
    ipcRenderer.on('view-package-reply', (event, pkg) => {
      let pkgData;
      try {
        pkgData = JSON.parse(pkg);
      } catch (e) {
        throw new Error(e);
      }

      if(pkgData) {
        this.props.actions.setActive(pkgData, false);
      }
    });

    // package actions replies
    ipcRenderer.on('install-package-reply', (event, pkg) => {
      this.reload();
    });
    ipcRenderer.on('install-package-error', (event, errorStr) => {
      console.log('INSTALL_ERROR', errorStr);
      this.props.actions.addMessage('error', errorStr);
    });
    ipcRenderer.on('uninstall-package-reply', (event, pkg) => {
      this.reload();
    });
    ipcRenderer.on('uninstall-package-error', (event, errorStr) => {
      console.log('UNINSTALL_ERROR', errorStr);
      this.props.actions.addMessage('error', errorStr);
    });
    ipcRenderer.on('update-package-reply', (event, pkg) => {
      this.reload();
    });
    ipcRenderer.on('update-package-error', (event, errorStr) => {
      console.log('UPDATE_ERROR', errorStr);
      this.props.actions.addMessage('error', errorStr);
    });
  }
  componentWillUnMount() {
    ipcRenderer.removeAllListeners([
      'get-packages-close',
      'search-packages-close',
      'get-packages-error',
      'install-package-reply',
      'uninstall-package-reply',
      'update-package-reply'
    ]);
  }
  render() {
    let props = this.props;

    return (
      <div className="packages">
        <div className="container-fluid half-padding">
          <div className="row">
            <div className="col-md-4">
              <PackagesListHeader
                title="Packages"
                total={props.packages.length}
                toggleLoader={props.actions.toggleLoader}
                reload={this.reload}
              />
              <PackagesListSearch
                setActive={props.actions.setActive}
                toggleLoader={props.actions.toggleLoader}
              />
              <PackagesList
                loading={props.loading}
                packages={props.packages}
                toggleLoader={props.actions.toggleLoader}
                toggleMainLoader={props.actions.toggleMainLoader}
                reload={this.reload}
              />
            </div>
            <div className="col-md-6">
              <PackageContainer active={props.active}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.global.loading,
    packages: state.packages.packages,
    active: state.packages.active
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer);
