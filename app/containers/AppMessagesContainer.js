import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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

export default connect(mapStateToProps)(AppMessagesContainer);
