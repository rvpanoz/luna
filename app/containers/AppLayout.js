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

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { Notifications } from 'components/pages/notifications';
import { removePackages, setActive } from 'models/packages/actions';
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
  const [dialog, setDialog] = useState({ open: false, content: null });

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
    ipcRenderer.on('tool-close', (event, toolError, result) => {
      try {
        const resultJson = JSON.parse(result);
        const { error } = resultJson;

        if (error && typeof error === 'object') {
          dispatch(
            setSnackbar({
              open: true,
              type: 'error',
              message: `${error.code}:${error.summary}`
            })
          );
        } else {
          setDialog({
            open: true,
            content: 'tool_report'
          });
        }

        dispatch(
          toggleLoader({
            loading: false,
            message: null
          })
        );
      } catch (err) {
        setDialog({
          open: true,
          content: result
        });
        dispatch(
          toggleLoader({
            loading: false,
            message: null
          })
        );
      }
    });

    ipcRenderer.on('action-close', (event, error, cliMessage, options) => {
      const operation = options && options[0];
      const removedOrUpdatedPackages =
        options &&
        options.filter(option => option !== operation || option !== '-g');
      let message = 'Packages updated';

      if (error && error.length) {
        const errors = error.split('npm');
        const timings = errors
          .filter(err => {
            const newErr = err.trim();

            return newErr.indexOf('info') > -1;
          })
          .map(e => e.trim());

        if (timings.length) {
          message = timings[timings.length - 1];
        }
      }

      if (operation === 'uninstall' && removedOrUpdatedPackages) {
        dispatch(removePackages({ removedPackages: removedOrUpdatedPackages }));
      }

      dispatch(
        setSnackbar({
          open: true,
          message
        })
      );

      dispatch(
        toggleLoader({
          loading: false,
          message: null
        })
      );
    });

    ipcRenderer.on('view-close', (event, status, cmd, data) => {
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

    return () =>
      ipcRenderer.removeAllListeners([
        'action-close',
        'tool-close',
        'view-close'
      ]);
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
            fullDirectory={directory}
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
              problems: () => (
                <Notifications mode={mode} directory={directory} />
              )
            })(<Packages />)(activePage)}
          </main>
        </div>
        {snackbarOptions && snackbarOptions.open && snackbarOptions.message && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: snackbarOptions.type === 'error' ? 'center' : 'right'
            }}
            open={snackbarOptions.open}
            autoHideDuration={5000}
          >
            <SnackbarContent
              variant={snackbarOptions.type}
              message={snackbarOptions.message}
              onClose={() =>
                dispatch(
                  setSnackbar({
                    open: false,
                    message: null,
                    type: null
                  })
                )
              }
            />
          </Snackbar>
        )}
        {dialog && dialog.open && (
          <Dialog open={dialog.open} aria-labelledby="results-tools">
            <DialogTitle>Results</DialogTitle>
            <DialogContent>{dialog.content}</DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  setDialog({
                    open: false,
                    content: null
                  })
                }
                color="secondary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </MuiThemeProvider>
  );
};

AppLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AppLayout);
