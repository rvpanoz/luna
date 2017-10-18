import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

//components
import AppNotifications from '../common/AppNotifications';

const AppNotificationsContainer = (props) => {
  return (
    <div className="notifications">
      <AppNotifications notifications={props.notifications}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    open: state.global.open,
    notifications: state.global.notifications
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNotificationsContainer);
