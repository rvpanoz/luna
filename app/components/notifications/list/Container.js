import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';

import {
  installMultiplePackages,
  viewPackageStart,
} from 'models/packages/actions';
import { iMessage } from 'commons/utils';
import Notifications from './Notifications';

const mapState = ({
  common: { mode },
  notifications: { active, notifications },
}) => ({
  active,
  notifications,
  mode,
});

const NotificationsContainer = () => {
  const { active, mode, notifications } = useMappedState(mapState);
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

  return (
    <>
      <Notifications
        active={active}
        mode={mode}
        notifications={notifications}
        onViewPackage={viewPackageHandler}
      />
    </>
  );
};

export default NotificationsContainer;
