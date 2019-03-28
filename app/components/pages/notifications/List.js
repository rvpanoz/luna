import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';

import ListSubheader from '@material-ui/core/ListSubheader';
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

import { INFO_MESSAGES } from 'constants/AppConstants';
import { installPackages, clearInstallOptions } from 'models/packages/actions';
import AddIcon from '@material-ui/icons/Add';
import Flags from 'components/pages/packages/Flags';
import NotificationsIcon from '@material-ui/icons/NotificationsActiveTwoTone';

import styles from './styles/list';

const mapState = ({
  common: { notifications },
  modules: {
    operations: { packagesInstallOptions }
  }
}) => ({
  packagesInstallOptions,
  notifications
});

const NotificationsItem = ({
  classes,
  type,
  body,
  mode,
  directory,
  installationOptions,
  required,
  requiredBy
}) => {
  const [dialogOpen, toggleDialog] = useState(false);
  const packageName = required && required.split('@')[0];
  console.log(packageName);

  const dispatch = useDispatch();

  const handleInstall = useCallback(
    (name, showOptions) => {
      if (mode === 'local' && showOptions) {
        return toggleDialog(!dialogOpen);
      }

      const { options } = installationOptions || {};

      const parameters = {
        ipcEvent: 'install',
        cmd: ['install'],
        single: true,
        name,
        pkgOptions: options,
        mode,
        directory
      };

      dispatch(installPackages(parameters));
      toggleDialog(false);
    },
    [mode, directory]
  );

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const WithStylesNotificationItem = withStyles({})(NotificationsItem);

const NotificationsList = ({ classes, mode, directory }) => {
  const { notifications, packagesInstallOptions } = useMappedState(mapState);

  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <List
          component="nav"
          subheader={
            <ListSubheader disableSticky className={classes.header}>
              <Typography variant="h6">{`Problems ${
                notifications.length
              }`}</Typography>
            </ListSubheader>
          }
          className={classes.root}
        >
          {notifications.length === 0 ? (
            <Typography variant="subtitle1" className={classes.withPadding}>
              No problems found
            </Typography>
          ) : (
            notifications.map((notification, idx) => {
              return (
                <WithStylesNotificationItem
                  key={`notfcn-${idx}`}
                  mode={mode}
                  directory={directory}
                  installationOptions={packagesInstallOptions}
                  {...notification}
                />
              );
            })
          )}
        </List>
      </div>
    </Paper>
  );
};

NotificationsList.propTypes = {
  classes: PropTypes.object.isRequired,
  mode: PropTypes.string,
  directory: PropTypes.string
};

export default withStyles(styles)(NotificationsList);
