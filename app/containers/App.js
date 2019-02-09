/* eslint-disable */

/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { withErrorBoundary } from 'commons/hocs';
import Layout from './Layout';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from 'components/layout/SnackbarContent';

import { commandMessage, uiException, setNpmVersion } from 'models/ui/actions';
import '../app.global.css';

const mapState = state => ({
  uiExceptionMessage: state.common.uiException.message,
  enableNotifications: state.common.enableNotifications
});

const App = () => {
  const dispatch = useDispatch();
  const { enableNotifications, uiExceptionMessage } = useMappedState(mapState);

  useEffect(() => {
    ipcRenderer.on('uncaught-exception', (event, ...args) => {
      dispatch({ type: uiException.type, payload: { message: args[0] } });
    });

    ipcRenderer.on('npm-version', (event, version) => {
      dispatch({ type: setNpmVersion.type, payload: { version } });
    });

    ipcRenderer.on('npm-error', event => {
      dispatch({
        type: uiException.type,
        payload: { message: 'npm is not installed' }
      });
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
      {!uiExceptionMessage ? <Layout app="Luna" /> : null}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={Boolean(uiExceptionMessage)}
        autoHideDuration={5000}
      >
        <SnackbarContent
          variant="error"
          message={uiExceptionMessage}
          onClose={false}
        />
      </Snackbar>
    </div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
