'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import AppMessage from '../common/AppMessage';

const AppMessageContainer = (props) => {
  return (
    <nav className="navbar navbar-static-top header-navbar">
      <AppMessage message={props.appMessage} messageType={props.appMessageType}/>
    </nav>
  )
}

function mapStateToProps(state) {
  return {
    appMessage: state.appMessage,
    appMessageType: state.appMessageType
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
)(AppMessageContainer)
