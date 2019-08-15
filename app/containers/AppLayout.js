import React from 'react';
import { useCallback } from 'react'
import { objectOf, string } from 'prop-types';
import cn from 'classnames';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

import AppTopBar from 'containers/AppTopBar';
import AppSidebar from 'containers/AppSidebar';
import AppNavigationBar from 'containers/AppNavigationBar';
import AppNotifications from 'containers/AppNotifications';
import AppSnackbar from 'components/common/AppSnackbar';
import { Notifications } from 'components/views/notifications';
import { setSnackbar } from 'models/ui/actions';
import { switchcase } from 'commons/utils';
import appTheme from 'styles/theme';

import Packages from './Packages';
import Audit from './Audit';
import Doctor from './Doctor';
import styles from './styles/appLayout';

const mapState = ({
  common: { mode, directory, onlineStatus },
  ui: { activePage, snackbar }
}) => ({
  onlineStatus,
  activePage,
  mode,
  directory,
  snackbar
});

const AppLayout = ({ classes }) => {
  const { activePage, snackbar } = useMappedState(mapState);
  const dispatch = useDispatch();

  const onClose = useCallback(() =>
    dispatch(
      setSnackbar({
        ...snackbar,
        open: false,
        message: null,
        type: 'info',
        hideOnClose: false
      })
    ), [dispatch, snackbar]);

  const { hideOnClose } = snackbar;

  return (
    <MuiThemeProvider theme={appTheme}>
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
          <AppTopBar className={classes.topBar} />
          <AppNavigationBar className={classes.navigationBar} />
          <main className={classes.content}>
            {switchcase({
              packages: () => <Packages />,
              problems: () => <Notifications />,
              audit: () => <Audit />,
              doctor: () => <Doctor />,
              notifications: () => <AppNotifications />
            })(<Packages />)(activePage)}
          </main>
        </section>

        <AppSnackbar snackbar={snackbar} ContentProps={{ 'aria-describedby': 'app-snackbar' }} onClose={hideOnClose ? null : onClose} />
      </div>
    </MuiThemeProvider>
  );
};

AppLayout.propTypes = {
  classes: objectOf(string).isRequired
};

export default withStyles(styles, {
  withTheme: true
})(AppLayout);
