/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */

import { remote } from 'electron';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';
import semver from 'semver';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/NotificationsActiveTwoTone';

import { installPackages } from 'models/packages/actions';
import styles from './styles/list';

const mapState = ({
  notifications: { notifications },
  common: {
    operations: { packagesInstallOptions }
  }
}) => ({
  notifications,
  packagesInstallOptions
});

const NotificationsItem = ({
  classes,
  type,
  mode,
  directory,
  required,
  requiredBy
}) => {
  const packageParts = required && required.split('@');
  const [packageName, packageVersion] = packageParts;
  const dispatch = useDispatch();

  let version = null;

  if (packageVersion) {
    const versionCoerced = semver.valid(semver.coerce(packageVersion));

    version = versionCoerced || version;
  }

  const handleInstall = useCallback(
    () =>
      remote.dialog.showMessageBox(
        remote.getCurrentWindow(),
        {
          title: 'Confirmation',
          type: 'question',
          message: `\nWould you like to install ${
            version ? `${packageName}@${version}` : packageName
          }?`,
          buttons: ['Cancel', 'Install']
        },
        btnIdx => {
          if (Boolean(btnIdx) === true) {
            const parameters = {
              ipcEvent: 'install',
              cmd: ['install'],
              single: true,
              name: version ? `${packageName}@${version}` : packageName,
              pkgOptions: [],
              mode,
              directory
            };

            dispatch(installPackages(parameters));
          }
        }
      ),
    [mode, directory, packageName, dispatch, version]
  );

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
          <Tooltip
            title={`Install ${packageName}`}
            key={`${packageName}-${packageVersion}`}
          >
            <IconButton
              aria-label="install-notification"
              onClick={() => handleInstall(packageName, true)}
            >
              <AddIcon color="primary" />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
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

  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <div className={classes.flexContainer}>
          <div className={classes.header}>
            <Typography variant="h6" className={classes.title}>
              {`Problems ${notifications ? notifications.length : 0}`}
            </Typography>
          </div>
        </div>
        <List className={classes.list}>
          {!notifications || notifications.length === 0 ? (
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
