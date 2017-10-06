'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

//components
import SearchBox from '../common/SearchBox';
import Header from '../components/packages/Header';
import PackagesList from '../components/packages/PackagesList';

const PackagesPage = (props) => {
  return (
    <PackagesList
      title={props.activePage}
      loading={props.loading}
      setPackages={props.actions.setPackages}
      packages={props.packages}
      toggleLoader={props.actions.toggleLoader}
      toggleMainLoader={props.actions.toggleMainLoader}
      setActive={props.actions.setActive}
      active={props.active}
    />
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
)(PackagesPage);
