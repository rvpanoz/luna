/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withErrorBoundary } from 'commons/hocs';

import { setEnv } from 'models/npm/actions';
import { initActions, updateStatus } from 'models/common/actions';
import { setUIException, setSnackbar } from 'models/ui/actions';

import { iMessage } from 'commons/utils';
import AppLayout from './AppLayout';

import '../app.global.css';

const mapState = ({ ui: { uiException } }) => ({
  uiException
});

const App = () => {
  const dispatch = useDispatch();
  const { uiException } = useMappedState(mapState);

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

    updateOnlineStatus();
  }, [dispatch]);

  useEffect(() => {
    ipcRenderer.once('finish-loaded', () => dispatch(initActions()));

    ipcRenderer.once('npm-env-close', (event, error, env) => {
      dispatch({ type: setEnv.type, payload: env });
    });

    ipcRenderer.on('yarn-lock-detected', () => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: iMessage('warning', 'yarnlock')
        })
      );
    });

    ipcRenderer.on('uncaught-exception', (event, ...args) => {
      dispatch({ type: setUIException.type, payload: { message: args[0] } });
    });

    return () =>
      ipcRenderer.removeAllListeners([
        'finish-loaded',
        'uncaught-exception',
        'npm-env-close',
        'yarn-env-close'
      ]);
  }, [dispatch]);

  return (
    <div id="app">{!uiException ? <AppLayout app="Luna" /> : uiException}</div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
