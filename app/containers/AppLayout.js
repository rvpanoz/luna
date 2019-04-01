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
import { Packages } from 'components/pages/packages';
import SnackbarContent from 'components/common/SnackbarContent';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import { Notifications } from 'components/pages/notifications';
import { setSnackbar, toggleLoader } from 'models/ui/actions';
import {
  switchcase,
  shrinkDirectory,
  parseNpmDoctor,
  parseNpmAudit,
  parseNpmPrune
} from 'commons/utils';

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
    metadata: { lastUpdatedAt },
    project: { name, version, description }
  }
}) => ({
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
    ipcRenderer.on('tool-close', (event, errors, cliResult, command) => {
      const toolName = command && command[0];

      const content = switchcase({
        audit: () => parseNpmAudit(cliResult),
        prune: () => parseNpmPrune(cliResult),
        doctor: () => parseNpmDoctor(cliResult)
      })(null)(toolName);

      if (cliResult) {
        setDialog({
          open: true,
          content: content || 'No results'
        });
      }

      dispatch(
        toggleLoader({
          loading: false,
          message: null
        })
      );
    });

    return () => ipcRenderer.removeAllListeners('tool-close');
  }, []);

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
            <DialogContent>
              <List dense>
                {dialog.content.map(item => (
                  <ListItem key={item.name}>
                    <ListItemText
                      primary={
                        <Typography veriant="h6">{item.name}</Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Typography veriant="h6">{item.value}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
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
