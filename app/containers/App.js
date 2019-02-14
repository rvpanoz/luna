/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withErrorBoundary } from 'commons/hocs';

import {
  commandMessage,
  uiException,
  setEnv,
  npmCommand
} from 'models/ui/actions';

import AppLayout from './AppLayout';
import '../app.global.css';

const mapState = state => ({
  uiExceptionMessage: state.common.uiException.message,
  enableNotifications: state.common.enableNotifications
});

const App = () => {
  const dispatch = useDispatch();
  const { enableNotifications, uiExceptionMessage } = useMappedState(mapState);

  useEffect(() => {
    ipcRenderer.on('uncaught-exception', (event, ...args) =>
      dispatch({ type: uiException.type, payload: { message: args[0] } })
    );

    ipcRenderer.on('ipcEvent-flow', (event, command) => {
      dispatch({ type: npmCommand.type, payload: { command } });
    });

    ipcRenderer.on('get-env-close', (event, env) =>
      dispatch({ type: setEnv.type, payload: env })
    );

    ipcRenderer.on('ipcEvent-error', (event, message) => {
      if (enableNotifications) {
        dispatch(
          commandMessage({
            message
          })
        );
      }
    });

    return () =>
      ipcRenderer.removeAllListeners(['ipcEvent-error', 'uncaught-exception']);
  });

  return (
    <div id="app">{!uiExceptionMessage ? <AppLayout app="Luna" /> : null}</div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
