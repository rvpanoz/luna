/**
* Packages Container Component
**/
'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {loadData, parse} from '../utils';
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
    this._loadData = this._loadData.bind(this);
    this._setupList = this._setupList.bind(this);
    this._setupOutdated = this._setupOutdated.bind(this);
  }
  _loadData(e, directory) {
    if(e) {
      e.preventDefault();
    }
    this.props.actions.toggleLoader(true);
    this.props.actions.clearMessages();
    this.props.actions.setActive(null);
    loadData(this.props.mode, directory);
  }
  _setupList(packages) {
    let notifications = parse(packages, 'problems');
    notifications.forEach((notification, idx) => {
      if (typeof notification === 'string') {
        this.props.actions.addMessage('error', notification);
      }
    });
    let packagesData = parse(packages, 'dependencies');
    this.props.actions.setPackages(packagesData);
    this.props.actions.setTotalInstalled(packagesData.length);
  }
  _setupOutdated(packages) {
    if (!packages) {
      this.props.actions.setPackagesOutdated([]);
      return;
    }
    let outdatedData = JSON.parse(packages);
    this.props.actions.setPackagesOutdated(outdatedData);
    this.props.actions.toggleLoader(false);
  }
  componentDidMount() {
    this._loadData();
    ipcRenderer.on('get-packages-close', (event, packages, command) => {
      switch (command) {
        case 'outdated':
          this._setupOutdated(packages);
          break;
        default:
          this._setupList(packages);
      }
    });

    ipcRenderer.on('search-packages-close', (event, packagesStr) => {
      let packages = parse(packagesStr, 'dependencies');
      this.props.actions.setPackages(packages);
      this.props.actions.setMode('SEARCH');
      this.props.actions.toggleLoader(false);
    });

    ipcRenderer.on('view-package-close', (event, packageStr) => {
      let pkg;
      try {
        pkg = JSON.parse(packageStr);
      } catch (e) {
        console.error(e);
      }

      if (pkg) {
        this.props.actions.setActive(pkg, false);
      } else {
        throw new Error('Package cannot be parsed');
      }
    });

    ipcRenderer.on('action-close', (event, pkg) => {
      this.loadData();
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
        <div className="packages">
          <div className="row">
            <div className="col-md-4">
              <PackagesListHeader title="Packages" total={props.packages.length} toggleLoader={props.actions.toggleLoader}/>
              <PackagesListSearch setActive={props.actions.setActive} toggleLoader={props.actions.toggleLoader} />
              <PackagesList loading={props.loading} packages={props.packages} toggleLoader={props.actions.toggleLoader} toggleMainLoader={props.actions.toggleMainLoader}/>
            </div>
            <div className="col-md-8">
              <PackageContainer active={props.active}/>
            </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
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
