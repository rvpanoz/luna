import React from 'react';
import { useCallback } from 'react';
import { objectOf, string } from 'prop-types';
import cn from 'classnames';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

import TopBar from 'components/topbar/TopBarContainer';
import Sidebar from 'components/sidebar/SidebarContainer';
import Navigation from 'components/navigation/Navigation';
import Packages from 'components/packages/Packages';
import Notifications from 'components/notifications/NotificationsContainer';
import { setSnackbar } from 'models/ui/actions';
import { switchcase } from 'commons/utils';
import appTheme from 'styles/theme';
import { AppSnackbar } from '../common/snackbar';

import styles from './styles';

const mapState = ({
  common: { mode, directory, onlineStatus },
  ui: { activePage, snackbar },
}) => ({
  onlineStatus,
  activePage,
  mode,
  directory,
  snackbar,
});

const AppLayout = ({ classes }) => {
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
          <Sidebar />
        </section>
        <section className={classes.main}>
          <TopBar className={classes.topBar} />
          <Navigation className={classes.navigationBar} />
          <main className={classes.content}>
            {switchcase({
              packages: () => <Packages />,
              notifications: () => <Notifications />,
            })(<Packages />)(activePage)}
          </main>
        </section>

        <AppSnackbar
          snackbar={snackbar}
          ContentProps={{ 'aria-describedby': 'app-snackbar' }}
          onClose={hideOnClose ? null : onClose}
        />
      </div>
    </MuiThemeProvider>
  );
};

AppLayout.propTypes = {
  classes: objectOf(string).isRequired,
};

export default withStyles(styles, {
  withTheme: true,
})(AppLayout);
