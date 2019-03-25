import { ipcRenderer } from 'electron';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import theme from 'styles/theme';
import { pickBy } from 'ramda';
import Navigator from 'components/layout/Navigator';
import Header from 'components/layout/AppHeader';
import { Packages } from 'components/pages/packages';
import SnackbarContent from 'components/common/SnackbarContent';
import { Notifications } from 'components/pages/notifications';
import {
  addActionError,
  removePackages,
  setActive
} from 'models/packages/actions';
import {
  setSnackbar,
  toggleLoader,
  togglePackageLoader
} from 'models/ui/actions';
import { switchcase, shrinkDirectory } from 'commons/utils';

import { drawerWidth } from 'styles/variables';
import styles from './styles/appLayout';

const mapState = ({
  common: {
    mode,
    directory,
    activePage,
    loader: { loading },
    npm: { env },
    snackbarOptions,
    notifications
  },
  modules: {
    data: { packages, packagesOutdated },
    metadata: { lastUpdatedAt },
    project: { name, version, description }
  }
}) => ({
  lastUpdatedAt,
  activePage,
  mode,
  directory,
  packages,
  packagesOutdated,
  name,
  version,
  loading,
  description,
  env,
  notifications,
  snackbarOptions
});

const AppLayout = ({ classes }) => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const {
    activePage,
    snackbarOptions,
    mode,
    directory,
    notifications,
    packages,
    packagesOutdated,
    env,
    ...restProps
  } = useMappedState(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('tool-close', (event, error, result) => {
      console.log(error);
      console.log(result);
    });

    ipcRenderer.on('action-close', (event, error, message, options) => {
      const removedOrUpdatedPackages = options && options.slice(2);
      const operation = options && options[0];

      if (error && error.length) {
        dispatch(addActionError({ error }));
      }

      // TODO: fix this
      if (operation === 'uninstall' && removedOrUpdatedPackages) {
        dispatch(removePackages({ removedPackages: removedOrUpdatedPackages }));
      }

      dispatch(
        setSnackbar({
          open: true,
          message: message || 'Packages updated'
        })
      );

      dispatch(
        toggleLoader({
          loading: false,
          message: null
        })
      );
    });

    return () => ipcRenderer.removeAllListeners(['action-close']);
  });

  useEffect(() => {
    ipcRenderer.on(['view-close'], (event, status, cmd, data) => {
      try {
        const newActive = data && JSON.parse(data);
        const getCleanProps = (val, key) => /^[^_]/.test(key);
        const properties = pickBy(getCleanProps, newActive);

        dispatch(setActive({ active: properties }));
        dispatch(
          togglePackageLoader({
            loading: false
          })
        );
      } catch (err) {
        throw new Error(err);
      }
    });

    return () => ipcRenderer.removeAllListeners(['view-package-close']);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Navigator
            totalpackages={packages && packages.length}
            totaloutdated={packagesOutdated && packagesOutdated.length}
            totalnotifications={notifications && notifications.length}
            mode={mode}
            directory={directory && shrinkDirectory(directory)}
            PaperProps={{ style: { width: drawerWidth } }}
            userAgent={env && env.userAgent}
            {...restProps}
          />
        </nav>
        <div className={classes.appContent}>
          <Header onDrawerToggle={() => toggleDrawer(!drawerOpen)} />
          <main className={classes.mainContent}>
            {switchcase({
              packages: () => <Packages />,
              problems: () => <Notifications />
            })(<Packages />)(activePage)}
          </main>
        </div>
        {snackbarOptions && snackbarOptions.open && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={Boolean(snackbarOptions.open)}
            autoHideDuration={999000}
            onClose={() =>
              dispatch(
                setSnackbar({
                  open: false,
                  message: null
                })
              )
            }
          >
            <SnackbarContent
              variant={snackbarOptions.type}
              message={snackbarOptions.message}
              onClose={() =>
                dispatch(
                  setSnackbar({
                    open: false,
                    message: null
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
