import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import { Notifications } from 'components/views/notifications';
import { installMultiplePackages } from 'models/packages/actions';
import { clearInstallOptions } from 'models/common/actions';
import { DialogOptionsView } from 'components/views/packages';
import { iMessage } from 'commons/utils';

const mapState = ({
  notifications: { notifications },
  common: {
    operations: { packagesInstallOptions }
  } }) => ({
    notifications,
    packagesInstallOptions
  });

const AppNotifications = () => {
  const [selected, setSelected] = useState([]);
  const [selectedPackagesNames, setSelectedPackagesNames] = useState([]);
  const [options, toggleOptions] = useState({
    open: false,
    single: false,
    name: null,
    version: null
  });
  const { notifications, packagesInstallOptions } = useMappedState(mapState);
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

  const handleCancel = useCallback(() => {
    dispatch(clearInstallOptions());
    toggleOptions({
      open: false,
      single: false,
      name: null,
      version: null
    });
  }, [dispatch]);

  const handleInstall = useCallback(
    () =>
      dispatch(
        installMultiplePackages({
          ipcEvent: 'npm-install',
          cmd: selectedPackagesNames.map(() => 'install'),
          multiple: true,
          packages: selectedPackagesNames.map(pkgName => `${pkgName}@latest`)
        })
      ),
    [selectedPackagesNames, dispatch]
  );

  useEffect(() => {
    const packagesNames = selected.length
      ? selected.map(notificationId => {
        const { requiredName } = notifications.find(
          notification => notification.id === notificationId
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
          toggleOptions({
            ...options,
            open: true
          })
        }
        handleSelectAll={handleSelectAll}
        handleSelectOne={handleSelectOne}
      />
      <Dialog
        open={options.open}
        fullWidth
        onClose={handleCancel}
        aria-labelledby="install-options"
      >
        <DialogContent>
          <DialogOptionsView selected={selectedPackagesNames} packagesInstallOptions={packagesInstallOptions} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            {iMessage('action', 'cancel')}
          </Button>
          <Button onClick={handleInstall} color="primary" autoFocus>
            {iMessage('action', 'install')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppNotifications;
