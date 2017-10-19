import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import AppMessages from '../common/AppMessages';

const AppMessagesContainer = (props) => {
  return (
    <AppMessages messages={props.messages}/>
  )
}

function mapStateToProps(state) {
  return {
    messages: state.global.messages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMessagesContainer);
