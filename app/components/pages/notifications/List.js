import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import semver from 'semver';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useMappedState } from 'redux-react-hook';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import NotificationsIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon1 from '@material-ui/icons/NotificationsActiveOutlined';
import NotificationsIcon2 from '@material-ui/icons/NotificationsActiveTwoTone';

import styles from './styles/notifications';

const mapState = ({ common: { notifications } }) => ({
  notifications
});

const NotificationsItem = ({ classes }) => {
  const [expanded, expand] = useState(false);

  return (
    <React.Fragment>
      <ListItem button onClick={() => expand(!expanded)}>
        <ListItemIcon>
          <NotificationsIcon2 />
        </ListItemIcon>
        <ListItemText inset primary="Notification" />
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <NotificationsIcon1 />
            </ListItemIcon>
            <ListItemText inset primary="notification_text" />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const WithStylesNotificationItem = withStyles({})(NotificationsItem);

const NotificationsList = ({ classes }) => {
  const { notifications } = useMappedState(mapState);
  console.log(notifications);

  return (
    <List
      component="nav"
      subheader={<ListSubheader component="div">Packages</ListSubheader>}
      className={classes.root}
    >
      {notifications.map((notification, idx) => {
        return (
          <WithStylesNotificationItem key={`not-${idx}`} {...notification} />
        );
      })}
    </List>
  );
};

NotificationsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotificationsList);
