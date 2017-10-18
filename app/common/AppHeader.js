import React from 'react';
import AppNotificationsContainer from '../containers/AppNotificationsContainer';

const AppHeader = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbar_main">
          <AppNotificationsContainer />
        </div>
      </div>
    </nav>
  )
}

export default AppHeader
