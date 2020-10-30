import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from 'components/layout/Layout';
import { withErrorBoundary } from 'commons/hocs';
import { setEnv } from 'models/npm/actions';
import {
  initActions,
  updateStatus,
  updateCommandLog,
} from 'models/common/actions';
import { setUIException, setSnackbar } from 'models/ui/actions';
import { iMessage } from 'commons/utils';
import theme from 'styles/theme';
import '../app.global.css';

const mapState = ({ ui: { uiException } }) => ({
  uiException,
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
        payload: { status: navigator.onLine ? 'online' : 'offline' },
      });
    };

    ipcRenderer.once('finish-loaded', () => dispatch(initActions()));
    ipcRenderer.once('npm-env-close', (event, env) => dispatch(setEnv(env)));

    ipcRenderer.on('yarn-lock-detected', () => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: iMessage('warning', 'yarnlock'),
        })
      );
    });

    ipcRenderer.on('npm-command-flow', (event, data) => {
      const { cmd, isTerminated } = data;
      const [command, ...args] = cmd;

      if (!isTerminated) {
        return;
      }

      dispatch(
        updateCommandLog({
          command: `npm ${cmd.join(' ')}`,
        })
      );
    });

    ipcRenderer.on('uncaught-exception', (event, ...args) => {
      dispatch({ type: setUIException.type, payload: { message: args[0] } });
    });

    // passing in true for the third parameter causes the event to be captured on the way down.
    window.addEventListener('online', updateOnlineStatus, true);
    window.addEventListener('offline', updateOnlineStatus, true);

    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus, true);
      window.removeEventListener('offline', updateOnlineStatus, true);

      ipcRenderer.removeAllListeners([
        'finish-loaded',
        'uncaught-exception',
        'npm-env-close',
        'npm-command-flow',
        'yarn-lock-detected',
      ]);
    };
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {!uiException ? <Layout app="Luna" /> : <div>{uiException?.message}</div>}
    </MuiThemeProvider>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
