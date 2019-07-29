import React from 'react';
import { useMappedState } from 'redux-react-hook';

import { Notifications } from 'components/views/notifications';

const mapState = ({ notifications: { notifications } }) => ({
  notifications
});

const AppNotifications = () => {
  const { notifications } = useMappedState(mapState);

  return <Notifications notifications={notifications} />;
};

export default AppNotifications;
