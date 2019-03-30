/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */

import { remote } from 'electron';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';
import semver from 'semver';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { INFO_MESSAGES } from 'constants/AppConstants';
import { installPackages, clearInstallOptions } from 'models/packages/actions';
import AddIcon from '@material-ui/icons/Add';
import Flags from 'components/pages/packages/Flags';
import NotificationsIcon from '@material-ui/icons/NotificationsActiveTwoTone';

import styles from './styles/list';

const mapState = ({ common: { notifications } }) => ({
  notifications
});

const NotificationsItem = ({
  classes,
  type,
  mode,
  directory,
  required,
  requiredBy
}) => {
  const [dialogOpen, toggleDialog] = useState(false);
  const packageParts = required && required.split('@');

  const packageName = packageParts && packageParts[0];
  const packageVersion = packageParts && packageParts[1];
  const dispatch = useDispatch();

  let version = null;

  if (packageVersion) {
    const versionCoerced = semver.coerce(packageVersion);

    version = versionCoerced ? versionCoerced.version : version;
  }

  const handleInstall = useCallback(() => {
    const parameters = {
      ipcEvent: 'install',
      cmd: ['install'],
      single: true,
      name: version ? `${packageName}@${version}` : packageName,
      mode,
      directory
    };

    remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        title: 'Confirmation',
        type: 'question',
        message: `Would you like to install ${parameters.name}?`,
        buttons: ['Cancel', 'Install']
      },
      btnIdx => {
        if (Boolean(btnIdx) === true) {
          dispatch(installPackages(parameters));

          return toggleDialog(false);
        }
      }
    );
  }, [mode, directory, packageName, packageVersion]);

  return (
    <section className={classes.item}>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: '#fff' }}>
            <NotificationsIcon
              color={type === 'ERROR' ? 'secondary' : 'default'}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={required} secondary={requiredBy} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="install-notification"
            onClick={() => handleInstall(packageName, true)}
          >
            <AddIcon color="primary" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Dialog
        open={dialogOpen}
        fullWidth
        onClose={() => {
          dispatch({ type: clearInstallOptions.type });
        }}
        aria-labelledby="install-options"
      >
        <DialogTitle>Installation options</DialogTitle>
        <DialogContent>
          <DialogContentText>{INFO_MESSAGES.installing}</DialogContentText>
          <Flags selected={[packageName]} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch({ type: clearInstallOptions.type });
              toggleDialog(false);
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleInstall(packageName)}
            color="primary"
            autoFocus
          >
            Install
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

NotificationsItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string,
  directory: PropTypes.string,
  required: PropTypes.string,
  requiredBy: PropTypes.string,
  type: PropTypes.string
};

const WithStylesNotificationItem = withStyles({})(NotificationsItem);

const NotificationsList = ({ classes, mode, directory }) => {
  const { notifications, packagesInstallOptions } = useMappedState(mapState);
  const dispatch = useDispatch();

  const handleInstallAll = useCallback(() => {
    const allPackages =
      notifications &&
      notifications.reduce((all, pkg) => {
        const { required } = pkg;
        const packageParts = required && required.split('@');
        const packageName = packageParts[0];
        const packageVersion = packageParts[1];

        let version = null;

        if (packageVersion) {
          const versionCoerced = semver.coerce(packageVersion);

          version = versionCoerced ? versionCoerced.version : version;
        }

        if (all.indexOf(packageName) === -1) {
          const packageWithVersion = version
            ? `${packageName}@${version}`
            : packageName;
          all.push(packageWithVersion);
        }

        return all;
      }, []);

    const parameters = {
      ipcEvent: 'install',
      cmd: ['install'],
      multiple: true,
      packages: allPackages,
      mode,
      directory
    };

    remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        title: 'Confirmation',
        type: 'question',
        message: `Would you like to install all packages?`,
        buttons: ['Cancel', 'Install']
      },
      btnIdx => {
        if (Boolean(btnIdx) === true) {
          dispatch(installPackages(parameters));
        }
      }
    );
  }, [mode, directory, notifications]);

  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <div className={classes.flexContainer}>
          <div className={classes.header}>
            <Typography variant="h6">
              {`Problems ${notifications.length}`}
            </Typography>
          </div>
          {notifications.length > 0 ? (
            <Toolbar>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => handleInstallAll()}
              >
                Fix all
              </Button>
            </Toolbar>
          ) : null}
        </div>
        <List className={classes.list}>
          {notifications.length === 0 ? (
            <Typography variant="subtitle1" className={classes.withPadding}>
              No problems found
            </Typography>
          ) : (
            notifications.map((notification, idx) => (
              <WithStylesNotificationItem
                key={`notification-${idx}`}
                mode={mode}
                directory={directory}
                installationOptions={packagesInstallOptions}
                {...notification}
              />
            ))
          )}
        </List>
      </div>
    </Paper>
  );
};

NotificationsList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string,
  directory: PropTypes.string
};

export default withStyles(styles)(NotificationsList);
