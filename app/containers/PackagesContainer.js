'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

//components
import PackagesListHeader from '../components/packages/PackagesListHeader';
import PackagesListSearch from '../components/packages/PackagesListSearch';
import PackagesList from '../components/packages/PackagesList';
import PackageContainer from '../containers/PackageContainer';

class PackagesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.reload = this.reload.bind(this);
  }
  reload() {
    this.props.actions.toggleLoader(true);
    this.props.actions.clearNotifications();
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      params: ['g', 'long']
    });
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
                setActive={props.actions.setActive}
                active={props.active}
                setAppMessage={props.actions.setAppMessage}
                clearNotifications={props.actions.clearNotifications}
                reload={this.reload}
              />
              <PackagesListSearch
                setActive={props.actions.setActive}
                toggleLoader={props.actions.toggleLoader}
              />
              <PackagesList
                loading={props.loading}
                packages={props.packages}
                setPackages={props.actions.setPackages}
                toggleLoader={props.actions.toggleLoader}
                setActive={props.actions.setActive}
                setMode={props.actions.setMode}
                setAppMessage={props.actions.setAppMessage}
                addNotification={props.actions.addNotification}
                clearNotifications={props.actions.clearNotifications}
                reload={this.reload}
              />
            </div>
            <div className="col-md-5">
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
