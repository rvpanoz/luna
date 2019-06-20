/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */

import { remote } from 'electron';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';

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
import Divider from '@material-ui/core/Divider';

import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/NotificationsActiveTwoTone';

import { setActivePage, clearFilters } from 'models/ui/actions';
import { setPackagesSearch } from 'models/packages/actions';
import { iMessage } from 'commons/utils';
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

const NotificationsItem = ({ classes, type, required, requiredBy }) => {
  const packageParts = required && required.split('@');
  const [packageName, packageVersion] = packageParts;
  const dispatch = useDispatch();

  const handleMissingPackages = useCallback(
    () =>
      remote.dialog.showMessageBox(
        remote.getCurrentWindow(),
        {
          title: 'Confirmation',
          type: 'question',
          message: iMessage('info', 'confirmNpmSearch', {
            '%packageName%': packageName
          }),
          buttons: ['Cancel', 'Search']
        },
        btnIdx => {
          if (Boolean(btnIdx) === true) {
            dispatch(clearFilters());

            dispatch({
              type: setActivePage.type,
              payload: {
                page: 'packages',
                paused: true
              }
            });

            dispatch(
              setPackagesSearch({
                channel: 'npm-search',
                options: {
                  cmd: ['search'],
                  pkgName: packageName,
                  fromSearch: true
                }
              })
            );
          }
        }
      ),
    [packageName, dispatch]
  );

  return (
    <div className={classes.item}>
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
            title={`Search for ${packageName}`}
            key={`${packageName}-${packageVersion}`}
          >
            <IconButton
              aria-label="search-for-package"
              onClick={() => handleMissingPackages()}
            >
              <SearchIcon color="primary" />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

NotificationsItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  required: PropTypes.string,
  requiredBy: PropTypes.string,
  type: PropTypes.string
};

const WithStylesNotificationItem = withStyles({})(NotificationsItem);

const NotificationsList = ({ classes }) => {
  const { notifications, packagesInstallOptions } = useMappedState(mapState);

  if (!notifications || !notifications.length) {
    return (
      <div className={classes.containerHolder}>
        <Typography
          variant="subtitle1"
          className={cn(classes.noData, classes.withPadding)}
        >
          {iMessage('info', 'noNotifications')}
        </Typography>
      </div>
    );
  }

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
        <Divider light />
        <List className={classes.list}>
          {notifications.map((notification, idx) => (
            <WithStylesNotificationItem
              key={`notification-${idx}`}
              installationOptions={packagesInstallOptions}
              {...notification}
            />
          ))}
        </List>
      </div>
    </Paper>
  );
};

NotificationsList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(NotificationsList);
