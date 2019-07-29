import React from 'react';
import { array, objectOf, string } from 'prop-types';
import { useMappedState } from 'redux-react-hook';

import { Notifications } from 'components/views/notifications';

const mapState = ({ notifications: { notifications } }) => ({
  notifications
});

const AppNotifications = () => {
  const { notifications } = useMappedState(mapState);

  return <Notifications notifications={notifications} />;
};

AppNotifications.propTypes = {
  classes: objectOf(string)
};

export default AppNotifications;
