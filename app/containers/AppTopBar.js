import React from 'react';
import { TopBar } from 'components/views/common/';
import { useMappedState } from 'redux-react-hook';

const mapState = ({
  common: { mode, directory },
  notifications: { notifications },
  npm: { env } }) => ({
    notifications,
    mode,
    directory,
    env
  });

const AppTopBar = () => {
  const {
    env,
    mode,
    directory,
    notifications
  } = useMappedState(mapState)

  return <TopBar mode={mode} directory={directory} notifications={notifications} env={env} />
};

export default AppTopBar;
