import { ipcRenderer } from 'electron';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import theme from 'styles/theme';

import Navigator from 'components/layout/Navigator';
import Header from 'components/layout/AppHeader';
import SnackbarContent from 'components/common/SnackbarContent';
import AuditReport from 'components/common/AuditReport';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { Packages } from 'components/pages/packages';
import { Notifications } from 'components/pages/notifications';
import { setSnackbar, toggleLoader } from 'models/ui/actions';
import { switchcase, shrinkDirectory, parseNpmAudit } from 'commons/utils';

import { drawerWidth } from 'styles/variables';
import styles from './styles/appLayout';

const mapState = ({
  npm: { env },
  notifications: { notifications },
  common: { mode, directory, onlineStatus },
  ui: {
    activePage,
    loaders: {
      loader: { loading }
    },
    snackbar
  },
  packages: {
    project: { name, version, description },
    metadata: { lastUpdatedAt }
  }
}) => ({
  onlineStatus,
  lastUpdatedAt,
  activePage,
  mode,
  directory,
  name,
  version,
  loading,
  description,
  env,
  notifications,
  snackbar
});

const AppLayout = ({ classes }) => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const [dialog, setDialog] = useState({
    type: 'info',
    open: false,
    content: null
  });

  const {
    activePage,
    snackbar,
    mode,
    directory,
    notifications,
    packagesData,
    packagesOutdated,
    env,
    onlineStatus,
    ...restProps
  } = useMappedState(mapState);

  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('tool-close', (event, errors, cliResult, command) => {
      const toolName = command && command[0];

      const content = switchcase({
        audit: () => parseNpmAudit(cliResult)
      })(null)(toolName);

      dispatch(
        toggleLoader({
          loading: false,
          message: null
        })
      );

      if (content) {
        setDialog({
          ...dialog,
          open: true,
          content
        });
      } else {
        dispatch(
          setSnackbar({
            type: 'info',
            open: true,
            message: 'npm audit fix completed'
          })
        );
      }
    });

    return () => ipcRenderer.removeAllListeners('tool-close');
  }, [dispatch, dialog]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Navigator
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
              variant={onlineStatus === 'offline' ? 'error' : snackbar.type}
              message={`${snackbar.message}`}
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
        {dialog && dialog.content && (
          <Dialog
            fullWidth
            open={dialog.open}
            aria-labelledby="npm-audit-results"
            classes={{
              paper: classes.paperDialog
            }}
          >
            <DialogContent>
              <AuditReport
                title="Results - npm audit"
                data={dialog && dialog.content}
              />
            </DialogContent>
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
