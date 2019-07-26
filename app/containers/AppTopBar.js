import React from 'react';
import { TopBar } from 'components/views/common/';
import { useMappedState, useDispatch } from 'redux-react-hook';

import { showDialog } from 'commons/utils';
import { setActivePage } from 'models/ui/actions'
import { setMode } from 'models/common/actions'
import { navigatorParameters } from 'commons/parameters';

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

  const dispatch = useDispatch();

  const loadDirectory = () => {
    const dialogHandler = filePath => {
      dispatch(
        setActivePage({
          page: 'packages',
          paused: false
        })
      );
      dispatch(setMode({ mode: 'local', directory: filePath.join('') }));
    };

    return showDialog(dialogHandler, { mode: 'file', ...navigatorParameters });
  };

  const setActivePageHandler = () => dispatch(setActivePage({
    page: 'audit',
    paused: true
  }))

  return <TopBar mode={mode} directory={directory} notifications={notifications} env={env} loading={loading} onLoadDirectory={loadDirectory} setActivePageHandler={setActivePageHandler} />
};

export default AppTopBar;
