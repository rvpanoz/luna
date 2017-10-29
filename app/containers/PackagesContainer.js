'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {parse} from '../utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
console.log(actions);
import PackagesListHeader from '../components/packages/PackagesListHeader';
import PackagesListSearch from '../components/packages/PackagesListSearch';
import PackagesList from '../components/packages/PackagesList';
import PackageContainer from '../containers/PackageContainer';

class PackagesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
    this.reload = this.reload.bind(this);
  }
  reload(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.toggleLoader(true);
    this.props.clearMessages();
    this.props.setActive(null);
    this.fetch();
  }
  fetch() {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['list', 'outdated'],
      params: ['g', 'parseable']
    });
  }
  componentDidMount() {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['list', 'outdated'],
      params: ['g', 'parseable']
    });

    ipcRenderer.on('get-packages-close', (event, packagesStr, command) => {
      let packages;
      switch (command) {
        case 'outdated':
          if (!packagesStr) {
            this.props.setPackagesOutdated([]);
            return;
          }
          packages = JSON.parse(packagesStr);
          this.props.setPackagesOutdated(packages);
          break;
        default:
          let notifications = parse(packagesStr, 'problems');
          notifications.forEach((notification, idx) => {
            if(typeof notification === 'string') {
              this.props.addMessage('error', notification);
            }
          });
          packages = parse(packagesStr, 'dependencies');
          this.props.setPackages(packages);
          this.props.setTotalInstalled(packages.length);
          this.props.setMode('GLOBAL');
          this.props.toggleLoader(false);
      }
    });

    ipcRenderer.on('analyze-json-close', (event, content) => {
      console.log(content);
      let packages = content.dependencies;
      // this.props.setPackages(packages);
    });
    
    ipcRenderer.on('ipcEvent-error', (event, errorMessage) => {
      console.log(errorMessage);
    });

    ipcRenderer.on('search-packages-close', (event, packagesStr) => {
      let packages = parse(packagesStr, 'dependencies');
      this.props.setPackages(packages);
      this.props.setMode('SEARCH', ['Install']);
      this.props.toggleLoader(false);
    });

    ipcRenderer.on('view-package-close', (event, packageStr) => {
      let pkg = JSON.parse(packageStr);
      if (pkg) {
        this.props.setActive(pkg, false);
      } else {
        throw new Error('Package cannot be parsed');
      }
    });

    ipcRenderer.on('action-close', (event, pkg) => {
      this.reload();
    });
  }
  componentWillUnMount() {
    ipcRenderer.removeAllListeners([
      'get-packages-close',
      'search-packages-close',
      'ipcEvent-error',
      'action-close',
      'analyze-json-close',
      'view-package-reply'
    ]);
  }
  render() {
    let props = this.props;

    return (
      <div className="container-fluid">
        <div className="packages">
          <div className="row">
            <div className="col-md-4 col-xs-10">
              <PackagesListHeader
                title="Packages"
                total={props.packages.length}
                toggleLoader={props.toggleLoader}
              />
              <PackagesListSearch
                setActive={props.setActive}
                toggleLoader={props.toggleLoader}
              />
              <PackagesList
                loading={props.loading}
                packages={props.packages}
                packagesInfo={props.packagesInfo}
                toggleLoader={props.toggleLoader}
                toggleMainLoader={props.toggleMainLoader}
              />
            </div>
            <div className="col-md-8 col-xs-10">
              <PackageContainer active={props.active} setModal={props.setModal}/>
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
    packagesInfo: state.packages.packagesInfo,
    showModal: state.global.showModal,
    active: state.packages.active
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: actions.addMessage,
    setPackages: actions.setPackages,
    setPackagesOutdated: actions.setPackagesOutdated,
    setModal: actions.setModal,
    setMode: actions.setMode,
    setTotalInstalled: actions.setTotalInstalled,
    toggleLoader: actions.toggleLoader,
    toggleMainLoader: actions.toggleMainLoader,
    setActive: actions.setActive
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer);
