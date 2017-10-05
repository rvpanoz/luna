'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

//components
import SearchBox from '../components/SearchBox';
import PackagesList from '../components/PackagesList';

const PackagesContainer = (props) => {
  return (
    <div className="item">
      <PackagesList
        loading={props.loading}
        setPackages={props.actions.setPackages}
        packages={props.packages}
        toggleLoader={props.actions.toggleLoader}
        setActive={props.actions.setActive}
        active={props.active}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    packages: state.packages,
    active: state.active
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackagesContainer);
