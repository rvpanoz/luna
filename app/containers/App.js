/* eslint-disable */

/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withErrorBoundary } from 'commons/hocs';
import Layout from './Layout';

import { commandMessage, uiException } from 'models/ui/actions';
import '../app.global.css';

const mapState = state => ({
  enableNotifications: state.common.enableNotifications
});

const App = () => {
  const dispatch = useDispatch();
  const { enableNotifications } = useMappedState(mapState);

  useEffect(() => {
    ipcRenderer.on('uncaught-exception', (event, ...args) => {
      console.error(args);
      dispatch(uiException(args));
    });

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
    <div id="app">
      <Layout app="Luna" />
    </div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
