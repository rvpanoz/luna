import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import { installMultiplePackages } from 'models/packages/actions';
import { clearInstallOptions } from 'models/common/actions';
import CommandOptions from 'components/packages/CommandOptions';
import { iMessage } from 'commons/utils';
import Notifications from './Notifications';

const mapState = ({ notifications: { notifications } }) => ({
  notifications,
});

const NotificationsContainer = () => {
  const [selected, setSelected] = useState([]);
  const [selectedPackagesNames, setSelectedPackagesNames] = useState([]);
  const [dialogOptions, setDialogOptions] = useState({
    open: false,
    single: false,
    name: null,
    version: null,
  });
  const { notifications } = useMappedState(mapState);
  const dispatch = useDispatch();

  const handleSelectAll = useCallback(
    (e) => {
      let selectedNotifications;

      if (e.target.checked) {
        selectedNotifications = notifications.map(
          (notification) => notification.id
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

  const handleCancel = useCallback(() => {
    dispatch(clearInstallOptions());
    setDialogOptions({
      open: false,
      single: false,
      name: null,
      version: null,
    });
  }, [dispatch]);

  const handleInstall = useCallback(
    () =>
      dispatch(
        installMultiplePackages({
          ipcEvent: 'npm-install',
          cmd: selectedPackagesNames.map(() => 'install'),
          multiple: true,
          packages: selectedPackagesNames.map((pkgName) => `${pkgName}@latest`),
          selectedFromNotifications: selectedPackagesNames,
        })
      ),
    [selectedPackagesNames, dispatch]
  );

  useEffect(() => {
    const packagesNames = selected.length
      ? selected.map((notificationId) => {
          const { requiredName } = notifications.find(
            (notification) => notification.id === notificationId
          );

          return requiredName;
        })
      : [];

    setSelectedPackagesNames(packagesNames);
  }, [selected, notifications]);

  return (
    <>
      <Notifications
        selected={selected}
        notifications={notifications}
        handleInstall={() =>
          setDialogOptions({
            ...dialogOptions,
            open: true,
          })
        }
        handleSelectAll={handleSelectAll}
        handleSelectOne={handleSelectOne}
      />
      <CommandOptions
        isOpen={dialogOptions.open}
        selected={selectedPackagesNames}
        onClose={() =>
          setDialogOptions({
            ...dialogOptions,
            open: false,
          })
        }
      />
    </>
  );
};

export default NotificationsContainer;
