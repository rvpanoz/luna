import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import theme from 'styles/theme';

import AppSidebar from 'containers/AppSidebar';
import AppHeader from 'containers/AppHeader';

import { SnackbarContent } from 'components/common';
import { Notifications } from 'components/views/notifications';
import { setSnackbar } from 'models/ui/actions';
import { switchcase, shrinkDirectory } from 'commons/utils';
import { drawerWidth } from 'styles/variables';

// pages
import Packages from './Packages';
import Audit from './Audit';
import Doctor from './Doctor';

// styling
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
  const [drawerOpen, toggleDrawer] = useState(false);
  const {
    activePage,
    snackbar,
    mode,
    directory,
    onlineStatus
  } = useMappedState(mapState);

  const dispatch = useDispatch();

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <nav className={classes.drawer}>
          <AppSidebar
            mode={mode}
            fullDirectory={directory}
            directory={directory && shrinkDirectory(directory)}
            PaperProps={{ style: { width: drawerWidth } }}
          />
        </nav>
        <div className={classes.appContent}>
          <AppHeader onDrawerToggle={() => toggleDrawer(!drawerOpen)} />
          <main className={classes.mainContent}>
            {switchcase({
              packages: () => <Packages />,
              problems: () => <Notifications />,
              audit: () => <Audit />,
              doctor: () => <Doctor />
            })(<Packages />)(activePage)}
          </main>
        </div>
        {snackbar && snackbar.open && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={snackbar.open}
            autoHideDuration={onlineStatus === 'online' ? 55000 : 999999}
            onClose={() =>
              dispatch(
                setSnackbar({
                  open: false,
                  message: null,
                  type: 'info'
                })
              )
            }
            ClickAwayListenerProps={{
              onClickAway: () =>
                dispatch(
                  setSnackbar({
                    open: false,
                    message: null,
                    type: 'info'
                  })
                )
            }}
          >
            <SnackbarContent
              variant={snackbar.type}
              message={snackbar.message}
              onClose={() =>
                dispatch(
                  setSnackbar({
                    open: false,
                    message: null,
                    type: 'info'
                  })
                )
              }
            />
          </Snackbar>
        )}
      </div>
    </MuiThemeProvider>
  );
};

AppLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AppLayout);
