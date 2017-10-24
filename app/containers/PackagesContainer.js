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
  fetch() {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: 'list',
      params: ['g', 'long']
    });

    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-outdated',
      cmd: 'outdated',
      params: ['g', 'long']
    });
  }
  reload(e) {
    if(e) {
      e.preventDefault();
    }
    this.props.actions.toggleLoader(true);
    this.props.actions.clearMessages();
    this.props.actions.setActive(null);
    this.fetch();
  }
  componentDidMount() {
    this.fetch();
    ipcRenderer.on('get-packages-close', (event, packagesString) => {
      let packages = parse(packagesString, 'dependencies');
      this.props.actions.setPackages(packages);
      this.props.actions.setMode('GLOBAL');
      this.props.actions.toggleLoader(false);
    });

    ipcRenderer.on('get-outdated-close', (event, packagesOutdated) => {
      try {
        if(!packagesOutdated) {
          this.props.actions.setPackagesOutdated([]);
          return;
        }
        let outdated = JSON.parse(packagesOutdated);
        this.props.actions.setPackagesOutdated(outdated);
      } catch (e) {
        console.error(e);
      }
    });

    ipcRenderer.on('ipcEvent-error', (event, errorMessage) => {
      let errorLinesArr = errorMessage.match(/[^\r\n]+/g);
      errorLinesArr.forEach((errorStr, idx) => {
        this.props.actions.addMessage('error', errorStr);
      });
    });

    ipcRenderer.on('search-packages-close', (event, packagesString) => {
      let packages = parse(packagesString, 'dependencies');
      this.props.actions.setPackages(packages);
      this.props.actions.setMode('SEARCH', ['Install']);
      this.props.actions.toggleLoader(false);
    });

    ipcRenderer.on('view-package-reply', (event, pkg) => {
      let pkgData, self = this;
      try {
        pkgData = JSON.parse(pkg);
      } catch (e) {
        throw new Error(e);
      }

      if(pkgData) {
        this.props.actions.setActive(pkgData, false);
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
      'get-packages-error',
      'action-close',
      'view-package-reply'
    ]);
  }
  render() {
    let props = this.props;

    return (
      <div className="packages">
        <div className="container-fluid half-padding">
          <div className="row">
            <div className="col-md-4 col-xs-10">
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
                packagesInfo={props.packagesInfo}
                toggleLoader={props.actions.toggleLoader}
                toggleMainLoader={props.actions.toggleMainLoader}
                reload={this.reload}
              />
            </div>
            <div className="col-md-7 col-xs-10">
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
