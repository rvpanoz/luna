import React from 'react';
import { TopBar } from 'components/views/common/';
import { useMappedState } from 'redux-react-hook';

const mapState = ({
  common: { mode, directory },
  notifications: { notifications },
  ui: {
    loaders: {
      loader: { loading }
    }
  },
  npm: { env } }) => ({
    notifications,
    mode,
    directory,
    env,
    loading
  });

const AppTopBar = () => {
  const {
    env,
    mode,
    directory,
    notifications,
    loading
  } = useMappedState(mapState)

  return <TopBar mode={mode} directory={directory} notifications={notifications} env={env} loading={loading} />
};

export default AppTopBar;
