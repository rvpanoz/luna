/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withErrorBoundary } from 'commons/hocs';
import { WARNING_MESSAGES } from 'constants/AppConstants';

import {
  commandMessage,
  uiException,
  setEnv,
  npmCommand,
  setSnackbar
} from 'models/ui/actions';

import AppLayout from './AppLayout';
import '../app.global.css';

const mapState = ({ common: { uiExceptionMessage, enableNotifications } }) => ({
  uiExceptionMessage,
  enableNotifications
});

const App = () => {
  const dispatch = useDispatch();
  const { enableNotifications, uiExceptionMessage } = useMappedState(mapState);

  useEffect(() => {
    ipcRenderer.on('uncaught-exception', (event, ...args) => {
      dispatch({ type: uiException.type, payload: { message: args[0] } });
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: args[0]
        })
      );
    });

    ipcRenderer.on('ipcEvent-error', (event, message) => {
      if (enableNotifications) {
        dispatch({ type: commandMessage.type, payload: { message } });
      }
    });

    ipcRenderer.on('ipcEvent-flow', (event, command) => {
      dispatch({ type: npmCommand.type, payload: { command } });
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
        'ipcEvent-error',
        'uncaught-exception',
        'ipcEvent-flow',
        'get-env-close',
        'yarn-warning-close'
      ]);
  });

  return (
    <div id="app">{!uiExceptionMessage ? <AppLayout app="Luna" /> : null}</div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
