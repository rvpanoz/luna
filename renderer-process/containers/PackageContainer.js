'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Loader from '../common/Loader';
import {showMessageBox} from '../../utils';
import PackageDetails from '../components/package/PackageDetails';

const PackageContainer = (props) => {
  return (
    <Loader loading={props.package_loading}>
      <div className="package-container">
        <PackageDetails pkg={props.active}/>
      </div>
    </Loader>
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
