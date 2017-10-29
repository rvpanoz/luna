'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Loader from '../common/Loader';
import AppModal from '../common/AppModal';
import {showMessageBox} from '../utils';
import PackageDetails from '../components/package/PackageDetails';

const PackageContainer = (props) => {
  return (
    <div className="package-container">
      {(props.showModal === false) ?
      <Loader loading={props.isLoading}>
          <div className="package-details">
            <PackageDetails
              active={props.active}
              packageActions={props.packageActions}
              setActive={props.actions.setActive}
              setModal={props.actions.setModal}
              toggleMainLoader={props.actions.toggleMainLoader}
              isLoading={props.isLoading}
            />
        </div>
      </Loader>
      : <div className="modal-container">
        <AppModal title={props.modalTitle} showModal={props.showModal}/>
      </div>
    }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    modalTitle: state.packages.modalTitle,
    packageActions: state.global.packageActions,
    showModal: state.packages.showModal,
    active: state.packages.active,
    isLoading: state.packages.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer);
