import React from 'react';
import { useState, useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';

import { Notifications } from 'components/views/notifications';
import { installMultiplePackages } from 'models/packages/actions';

const mapState = ({ notifications: { notifications } }) => ({
  notifications
});

const AppNotifications = () => {
  const [selected, setSelected] = useState([]);
  const { notifications } = useMappedState(mapState);
  const dispatch = useDispatch();

  const handleSelectAll = useCallback(
    e => {
      let selectedNotifications;

      if (e.target.checked) {
        selectedNotifications = notifications.map(
          notification => notification.id
        );
      } else {
        selectedNotifications = [];
      }

      setSelected(selectedNotifications);
    },
    [notifications]
  );

  const handleSelectOne = useCallback(
    (e, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const handleInstall = useCallback(() => {
    const packages = selected.map(notificationId => {
      const { required } = notifications.find(
        notification => notification.id === notificationId
      );

      return required;
    });

    return dispatch(
      installMultiplePackages({
        ipcEvent: 'npm-install',
        cmd: packages.map(() => 'install'),
        multiple: true,
        packages
      })
    );
  }, [selected, notifications, dispatch]);

  return (
    <Notifications
      selected={selected}
      notifications={notifications}
      handleInstall={handleInstall}
      handleSelectAll={handleSelectAll}
      handleSelectOne={handleSelectOne}
    />
  );
};

export default AppNotifications;
