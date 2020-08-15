import { ipcRenderer } from 'electron';
import React, { useEffect, useCallback, ReactNode } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import cn from 'classnames';
import { initActions, updateStatus } from '../models/common/actions';
import { setUIException, setSnackbar } from '../models/ui/actions';
import theme from '../styles/theme';

import AppSidebar from './AppSidebar';
import { Grid, withStyles } from '@material-ui/core';
import AppTopBar from './AppTopBar';
import AppNavigationBar from './AppNavigationBar';
import AppSnackbar from '../components/common/AppSnackbar';
import Packages from './Packages';
import Audit from './Audit';
import { switchcase } from '../commons/utils';
import Doctor from './Doctor';
import { Notifications } from '../components/views/notifications';
import AppNotifications from './AppNotifications';

import styles from './styles/app';
import { AppState } from '../state.d';

type Props = {
  classes: any,
  children: ReactNode;
};

const mapState = (state: AppState) => ({
  uiException: state.uiException,
  onlineStatus: state.onlinestatus,
  activePage: state.ui.activePage,
  mode: state.mode,
  directory: state.directory,
  snackbar: state.ui.snackbar,
});

const App = (props: Props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const { uiException, snackbar, activePage } = useMappedState(mapState);
  const { hideOnClose } = snackbar;

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

    updateOnlineStatus();
  }, [dispatch]);

  useEffect(() => {
    ipcRenderer.on('finish-loaded', () => dispatch(initActions()));
    ipcRenderer.on('uncaught-exception', (_, ...args) => {
      dispatch({ type: setUIException.type, payload: { message: args[0] } });
    });

    return () => {
      ipcRenderer.removeAllListeners('finish-loaded');
      ipcRenderer.removeAllListeners('uncaught-exception');
    }
  }, [dispatch]);

  if (uiException) {
    return uiException;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className={cn({
          [classes.root]: true,
          [classes.shiftContent]: true
        })}
      >
        <section className={classes.sidebar}>
          <AppSidebar />
        </section>
        <section className={classes.main}>
          <Grid container>
            <AppTopBar className={classes.topBar} />
            <AppNavigationBar className={classes.navigationBar} />
            <main className={classes.content}>
              {switchcase({
                packages: () => <Packages />,
                problems: () => <Notifications />,
                audit: () => <Audit />,
                doctor: () => <Doctor />,
                notifications: () => <AppNotifications />,
              })(<Packages />)(activePage)}
            </main>
          </Grid>
        </section>

        <AppSnackbar
          snackbar={snackbar}
          onClose={hideOnClose ? null : onClose}
        />
      </div>
    </MuiThemeProvider>
  );
}
export default withStyles(styles, {
  withTheme: true,
})(App);
