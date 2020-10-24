import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import {
  installMultiplePackages,
  viewPackageStart,
} from 'models/packages/actions';
import { clearInstallOptions } from 'models/common/actions';
import CommandOptions from 'components/packages/CommandOptions';
import { iMessage } from 'commons/utils';
import Notifications from './Notifications';

const mapState = ({
  notifications: { notifications },
  packages: { active },
}) => ({
  active,
  notifications,
});

const NotificationsContainer = () => {
  const [selected, setSelected] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { active, notifications } = useMappedState(mapState);
  const dispatch = useDispatch();

  const handleSelectAll = useCallback(
    (e) => {
      if (e.target.checked) {
        return setSelected(
          notifications.map((notification) => notification.id)
        );
      }

      setSelected([]);
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

  const viewPackageHandler = useCallback(
    (name, version) =>
      dispatch(
        viewPackageStart({
          channel: 'npm-view',
          options: {
            cmd: ['view'],
            name,
            version: name === 'npm' ? null : version,
          },
        })
      ),
    [dispatch]
  );

  const selectedPackages = selected.length
    ? selected.map((notificationId) => {
        const { requiredName } = notifications.find(
          (notification) => notification.id === notificationId
        );

        return requiredName;
      })
    : [];

  return (
    <>
      <Notifications
        active={active}
        selected={selected}
        notifications={notifications}
        handleInstall={() => setDialogOpen(true)}
        handleSelectAll={handleSelectAll}
        handleSelectOne={handleSelectOne}
        onViewPackage={viewPackageHandler}
      />
      <CommandOptions
        isOpen={isDialogOpen}
        selected={selectedPackages}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default NotificationsContainer;
