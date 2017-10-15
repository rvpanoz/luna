import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

import AppMessage from '../common/AppMessage';

const AppMessageContainer = (props) => {
  return (
    <div className="app-message">
      <AppMessage show={props.open} appMessage={props.appMessage}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    open: state.global.open,
    appMessage: state.global.appMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMessageContainer);
