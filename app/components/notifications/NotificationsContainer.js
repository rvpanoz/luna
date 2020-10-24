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

const mapState = ({ notifications: { active, notifications } }) => ({
  active,
  notifications,
});

const NotificationsContainer = () => {
  const [selected, setSelected] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { active, notifications } = useMappedState(mapState);
  const dispatch = useDispatch();

  const viewPackageHandler = useCallback(
    (name, version) =>
      dispatch(
        viewPackageStart({
          channel: 'npm-view',
          options: {
            cmd: ['view'],
            name,
            version: name === 'npm' ? null : version,
            notification: true,
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
