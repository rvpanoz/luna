/**
 * AppLayout
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import theme from 'styles/theme';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import AppSidebar from 'containers/AppSidebar';
import AppHeader from 'containers/AppHeader';
import SnackbarContent from 'components/common/SnackbarContent';
import AuditReport from 'components/common/AuditReport';
import { Packages } from 'components/views/packages';
import { Notifications } from 'components/views/notifications';

import { runAudit } from 'models/npm/actions';
import { setDialog, setSnackbar } from 'models/ui/actions';

import { switchcase, shrinkDirectory } from 'commons/utils';
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
    dialog,
    snackbar
  },
  packages: {
    project: { name, version, description },
    metadata: { lastUpdatedAt }
  }
}) => ({
  dialog,
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

  const {
    activePage,
    snackbar,
    mode,
    dialog,
    directory,
    notifications,
    packagesData,
    packagesOutdated,
    env,
    onlineStatus,
    ...restProps
  } = useMappedState(mapState);

  const dispatch = useDispatch();

  const closeDialog = () =>
    dispatch(
      setDialog({
        open: false,
        name: null,
        content: null
      })
    );

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <AppSidebar
            mode={mode}
            fullDirectory={directory}
            directory={directory && shrinkDirectory(directory)}
            PaperProps={{ style: { width: drawerWidth } }}
            userAgent={env && env.userAgent}
            {...restProps}
          />
        </nav>
        <div className={classes.appContent}>
          <AppHeader onDrawerToggle={() => toggleDrawer(!drawerOpen)} />
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
        {dialog && dialog.open && (
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
                data={dialog && dialog.report.content}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  dispatch(
                    runAudit({
                      channel: 'ipc-event',
                      ipcEvent: 'audit',
                      cmd: ['audit'],
                      fix: true,
                      mode,
                      directory
                    })
                  );

                  closeDialog();
                }}
                color="primary"
              >
                Fix
              </Button>
              <Button onClick={() => closeDialog()} color="secondary">
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
