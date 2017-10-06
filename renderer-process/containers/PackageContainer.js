'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Loader from '../common/Loader';
import {showMessageBox} from '../../utils';
import PackageHeader from '../components/PackageHeader';
import PackageDetails from '../components/PackageDetails';

const PackageContainer = (props) => {
  return (
    <div className="main">
      <Loader loading={props.package_loading}>
        <div className="ui container">
          <div className="ui basic padded segment">
            <PackageHeader
              pkg={props.active}
              mode={props.mode}
              setMode={props.actions.setMode}
              setActive={props.actions.setActive}
              toggleLoader={props.actions.toggleLoader}
              showMessageBox={showMessageBox} />
          </div>
          <div className="ui basic padded segment">
            <PackageDetails pkg={props.active}/>
          </div>
        </div>
      </Loader>
    </div>
  )
}

function mapStateToProps(state) {
  return {mode: state.mode, package_loading: state.package_loading, active: state.active};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer);
