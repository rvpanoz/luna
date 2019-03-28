import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import semver from 'semver';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';

import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import NotificationsIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon1 from '@material-ui/icons/NotificationsActiveOutlined';
import NotificationsIcon2 from '@material-ui/icons/NotificationsActiveTwoTone';

import styles from './styles/list';

const mapState = ({ common: { notifications } }) => ({
  notifications
});

const NotificationsItem = ({ classes, type, body, required, requiredBy }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar className={classes.avatar} style={{ backgroundColor: '#fff' }}>
        <NotificationsIcon2
          color={type === 'ERROR' ? 'secondary' : 'default'}
        />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={required} secondary={requiredBy} />
    <ListItemSecondaryAction>
      <IconButton aria-label="install-notification">
        <AddIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const WithStylesNotificationItem = withStyles({})(NotificationsItem);

const NotificationsList = ({ classes }) => {
  const { notifications } = useMappedState(mapState);

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
          <Divider light className={classes.divider} />

          {notifications.length === 0 ? (
            <Typography variant="subtitle1" className={classes.withPadding}>
              No problems found
            </Typography>
          ) : (
            notifications.map((notification, idx) => {
              return (
                <WithStylesNotificationItem
                  key={`not-${idx}`}
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotificationsList);
