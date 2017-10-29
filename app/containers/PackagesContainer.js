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
    this.fetch = this.fetch.bind(this);
    this.reload = this.reload.bind(this);
    this.loadList = this.loadList.bind(this);
    this.loadOutdated = this.loadOutdated.bind(this);
  }
  reload(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.actions.toggleLoader(true);
    this.props.actions.clearMessages();
    this.props.actions.setActive(null);
    this.fetch();
  }
  fetch() {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['list', 'outdated'],
      params: ['g', 'parseable']
    });
  }
  loadList(packages) {
    let notifications = parse(packages, 'problems');
    notifications.forEach((notification, idx) => {
      if(typeof notification === 'string') {
        this.props.actions.addMessage('error', notification);
      }
    });
    let packagesData = parse(packages, 'dependencies');
    this.props.actions.setPackages(packagesData);
    this.props.actions.setTotalInstalled(packagesData.length);
    this.props.actions.setMode('GLOBAL');
    this.props.actions.toggleLoader(false);
  }
  loadOutdated(packages) {
    if (!packages) {
      this.props.actions.setPackagesOutdated([]);
      return;
    }
    let outdatedData = JSON.parse(packages);
    this.props.actions.setPackagesOutdated(outdatedData);
  }
  componentDidMount() {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['list', 'outdated'],
      params: ['g', 'parseable']
    });

    ipcRenderer.on('get-packages-close', (event, packages, command) => {
      switch (command) {
        case 'outdated':
          this.loadOutdated(packages);
          break;
        default:
          this.loadList(packages);
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
      this.props.actions.setPackages(packages);
      this.props.actions.setMode('SEARCH', ['Install']);
      this.props.actions.toggleLoader(false);
    });

    ipcRenderer.on('view-package-close', (event, packageStr) => {
      let pkg;
      try {
        pkg = JSON.parse(packageStr);
      } catch(e) {
        console.error(e);
      }

      if (pkg) {
        this.props.actions.setActive(pkg, false);
      } else {
        throw new Error('Package cannot be parsed');
      }
    });

    ipcRenderer.on('action-close', (event, pkg) => {
      // this.reload();
      // setTimeout(() => {
      //   this.props.actions.setModal(false);
      // }, 3000);

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
                toggleLoader={props.actions.toggleLoader}
              />
              <PackagesListSearch
                setActive={props.actions.setActive}
                toggleLoader={props.actions.toggleLoader}
              />
              <PackagesList
                loading={props.loading}
                packages={props.packages}
                packagesInfo={props.packagesInfo}
                toggleLoader={props.actions.toggleLoader}
                toggleMainLoader={props.actions.toggleMainLoader}
              />
            </div>
            <div className="col-md-8 col-xs-10">
              <PackageContainer active={props.active} />
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
    active: state.packages.active
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer);
