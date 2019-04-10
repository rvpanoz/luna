/* eslint-disable  no-nested-ternary */

/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useState, useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withErrorBoundary } from 'commons/hocs';
import { WARNING_MESSAGES } from 'constants/AppConstants';

import { setEnv } from 'models/npm/actions';
import { updateStatus } from 'models/common/actions';
import { setUIException, setSnackbar } from 'models/ui/actions';

import AppLayout from './AppLayout';
import AppError from './AppError';

import '../app.global.css';

const mapState = ({ ui: { uiException } }) => ({
  uiException
});

const App = () => {
  const dispatch = useDispatch();
  const [npmError, setNpmError] = useState(null);
  const { uiException } = useMappedState(mapState);

  useEffect(() => {
    const updateOnlineStatus = () => {
      ipcRenderer.send(
        'online-status-changed',
        navigator.onLine ? 'online' : 'offline'
      );

      dispatch({
        type: updateStatus.type,
        payload: { status: navigator.onLine ? 'online' : 'offline' }
      });
    };

    // Passing in true for the third parameter causes the event to be captured on the way down.
    // Stopping propagation means that the event never reaches the listeners that are listening for it.
    window.addEventListener('online', updateOnlineStatus, true);
    window.addEventListener('offline', updateOnlineStatus, true);
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: updateStatus.type,
      payload: { status: navigator.onLine ? 'online' : 'offline' }
    });

    ipcRenderer.on('uncaught-exception', (event, ...args) => {
      dispatch({ type: setUIException.type, payload: { message: args[0] } });
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

    ipcRenderer.on('get-env-close', (event, env) => {
      dispatch({ type: setEnv.type, payload: env });
    });

    return () =>
      ipcRenderer.removeAllListeners([
        'uncaught-exception',
        'npm-error',
        'get-env-close',
        'yarn-warning-close'
      ]);
  }, [dispatch]);

  return (
    <div id="app">
      {npmError ? (
        <AppError error={npmError} />
      ) : !uiException ? (
        <AppLayout app="Luna" />
      ) : (
        uiException
      )}
    </div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
