import React from 'react';
import { useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import cn from 'classnames';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import AppTopBar from '../../containers/AppTopBar';
import AppSidebar from '../../containers/AppSidebar';
import AppNavigationBar from '../../containers/AppNavigationBar';
import AppNotifications from '../../containers/AppNotifications';
import AppSnackbar from '../../components/common/AppSnackbar';
import { Notifications } from '../../components/views/notifications';
import { setSnackbar } from '../../models/ui/actions';
import { switchcase } from '../../commons/utils';
import appTheme from '../../styles/theme';
import Packages from '../../containers/Packages';
import Audit from '../../containers/Audit';
import Doctor from '../../containers/Doctor';
import styles from './styles';

import { AppState } from '../../state.d';

type Props = {
  classes: any
};

const mapState = (state: AppState) => ({
  onlineStatus: state.onlinestatus,
  activePage: state.ui.activePage,
  mode: state.mode,
  directory: state.directory,
  snackbar: state.ui.snackbar,
});

const AppLayout = (props: Props) => {
  const { classes } = props;
  const { activePage, snackbar } = useMappedState(mapState);
  const dispatch = useDispatch();

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

  const { hideOnClose } = snackbar;

  return (
    <MuiThemeProvider theme={appTheme}>
      <div
        className={cn({
          [classes.root]: true,
          [classes.shiftContent]: true,
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
};
export default withStyles({
  ...styles
}, {
  withTheme: true,
})(AppLayout);
