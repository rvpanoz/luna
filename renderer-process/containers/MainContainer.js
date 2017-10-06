'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import MainHeader from '../components/MainHeader';

const MainContainer = (props) => {
  return (
    <div className="main">
      <div className="main__scroll">
        <div className="main__cont">
            <MainHeader title={props.activePage}/>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    activePage: state.activePage,
    pageTitle: state.pageTitle
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)
