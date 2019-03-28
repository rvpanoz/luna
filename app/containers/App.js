/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useState, useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withErrorBoundary } from 'commons/hocs';
import { WARNING_MESSAGES } from 'constants/AppConstants';

import {
  uiException,
  setEnv,
  setSnackbar,
  updateStatus
} from 'models/ui/actions';

import AppLayout from './AppLayout';
import AppError from './AppError';

import '../app.global.css';

const mapState = ({ common: { uiExceptionMessage } }) => ({
  uiExceptionMessage
});

const App = () => {
  const dispatch = useDispatch();
  const [npmError, setNpmError] = useState(null);
  const { uiExceptionMessage } = useMappedState(mapState);

  useEffect(() => {
    dispatch({
      type: updateStatus.type,
      payload: { status: navigator.onLine ? 'online' : 'offline' }
    });

    const updateOnlineStatus = () => {
      console.log(navigator.onLine);
      ipcRenderer.send(
        'online-status-changed',
        navigator.onLine ? 'online' : 'offline'
      );

      dispatch({
        type: updateStatus.type,
        payload: { status: navigator.onLine ? 'online' : 'offline' }
      });
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    ipcRenderer.on('uncaught-exception', (event, ...args) => {
      dispatch({ type: uiException.type, payload: { message: args[0] } });
    });

    ipcRenderer.on('npm-error', (event, ...args) => {
      const error = args && args[0];

      setNpmError(error);
    });

    ipcRenderer.on('yarn-warning-close', () => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: WARNING_MESSAGES.yarnlock
        })
      );
    });

    ipcRenderer.once('get-env-close', (event, env) => {
      dispatch({ type: setEnv.type, payload: env });
    });

    return () =>
      ipcRenderer.removeAllListeners([
        'uncaught-exception',
        'npm-error',
        'ipcEvent-flow',
        'get-env-close',
        'yarn-warning-close'
      ]);
  }, []);

  return (
    <div id="app">
      {npmError ? (
        <AppError error={npmError} />
      ) : !uiExceptionMessage ? (
        <AppLayout app="Luna" />
      ) : (
        uiExceptionMessage.message
      )}
    </div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
