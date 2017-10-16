import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

//components
import AppNotifications from '../common/AppNotifications';

const AppNotificationsContainer = (props) => {
  return (
    <div className="notifications">
      <AppNotifications show={props.open} appMessage={props.appMessage}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppNotificationsContainer);
