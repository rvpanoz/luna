import { ipcRenderer } from 'electron';
import React, { useEffect, useCallback, ReactNode } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { hot } from 'react-hot-loader/root';
import { initActions, updateStatus } from '../models/common/actions';
import { setUIException, setSnackbar } from '../models/ui/actions';
import { setEnv } from '../models/npm/actions';
import { switchcase } from '../commons/utils';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Packages from './Packages';
import Notifications from './Notifications';
import Analytics from './Analytics';

import { AppState } from '../state.d';

const mapState = (state: AppState) => ({
  uiException: state.uiException,
  onlineStatus: state.common.onlinestatus,
  activePage: state.ui.activePage,
  mode: state.common.mode,
  directory: state.common.directory,
  snackbar: state.ui.snackbar,
  env: state.npm.env
});

const App = () => {
  const dispatch = useDispatch();
  const { uiException, snackbar, activePage, directory, env } = useMappedState(mapState);

  const onClose = useCallback(
    () =>
      dispatch(
        setSnackbar({
          ...snackbar,
          open: false,
          message: null,
          type: 'info',
          hideOnClose: false,
        })
      ),
    [dispatch, snackbar]
  );

  useEffect(() => {
    const updateOnlineStatus = () => {
      ipcRenderer.send(
        'app-online-status',
        navigator.onLine ? 'online' : 'offline'
      );

      dispatch({
        type: updateStatus.type,
        payload: { status: navigator.onLine ? 'online' : 'offline' }
      });
    };

    // passing in true for the third parameter causes the event to be captured on the way down.
    window.addEventListener('online', updateOnlineStatus, true);
    window.addEventListener('offline', updateOnlineStatus, true);

    ipcRenderer.once('finish-loaded', () => dispatch(initActions()));

    ipcRenderer.on('npm-env-close', (event, error, data) => {
      try {
        const env = JSON.parse(data);
        dispatch({ type: setEnv.type, payload: env });
      } catch { };
    });

    ipcRenderer.once('yarn-lock-detected', () => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: 'Yarn.lock detected'
        })
      );
    });

    ipcRenderer.on('uncaught-exception', (_, ...args) => {
      dispatch({ type: setUIException.type, payload: { message: args[0] } });
    });

    updateOnlineStatus();

    return () => {
      ipcRenderer.removeAllListeners('finish-loaded');
      ipcRenderer.removeAllListeners('uncaught-exception');
      ipcRenderer.removeAllListeners('npm-env-close');
      ipcRenderer.removeAllListeners('yarn-lock-detected');
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    }
  }, [dispatch]);

  if (uiException) {
    return uiException;
  }

  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1 pl-16">
        <div id="header">
          <Header directory={directory || env.prefix} />
        </div>
        <div id="main-content" className="w-full p-4">
          {switchcase({
            packages: () => <Packages />,
            analytics: () => <Analytics />,
            notifications: () => <Notifications />,
          })(<Packages />)(activePage)}
        </div>
      </div>
    </>
  );
}

export default hot(App);

