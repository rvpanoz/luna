import React from 'react';

const AppNotificationItem = (props) => {
  let notification = props.notification;
  return (
    <a href="#" className="navbar-messages__item">
      <div className="navbar-messages__body">
        <p className="navbar-messages__content has-error">
          {notification.notificationMessage}
        </p>
      </div>
    </a>
  )
}

export default AppNotificationItem;
