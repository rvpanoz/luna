import React from 'react';
import PropTypes, { arrayOf, objectOf, string, func } from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/styles';
import { Grid, Paper, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { HelperText } from 'components/common';
import { iMessage } from 'commons/utils';
import TableHeader from './Header';
import NotificationsToolbar from './NotificationsToolbar';
import NotificationDetails from './NotificationDetails';
import styles from './styles/notifications';

const NotificationItem = ({ classes, id, onClick, ...restProps }) => {
  const {
    requiredName,
    requiredVersion,
    minVersion,
    reason,
    requiredByName,
  } = restProps;

  return (
    <>
      <ListItem
        key={id}
        onClick={() => onClick(requiredName, minVersion)}
        className={classes.listItem}
      >
        <ListItemText
          primary={`${requiredName}-${minVersion}`}
          secondary={
            <Typography
              component="span"
              variant="subtitle2"
              color="textSecondary"
            >
              {requiredByName}
            </Typography>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

NotificationItem.propTypes = {
  classes: objectOf(string).isRequired,
  id: string.isRequired,
  reason: string.isRequired,
  requiredName: string,
  requiredVersion: string,
  requiredByName: string,
  minVersion: string,
};

const WithStylesItem = withStyles(styles)(NotificationItem);

const NotificationsList = ({
  classes,
  notifications,
  active,
  mode,
  onViewPackage,
}) => {
  const noNotifications = !notifications || notifications.length === 0;

  if (noNotifications) {
    return <HelperText text={iMessage('info', 'noNotifications')} />;
  }

  return (
    <Grid container>
      <Grid item md={8} lg={8} xl={8} className={classes.transition}>
        <Paper elevation={2}>
          <div className={classes.toolbar}>
            <NotificationsToolbar
              title={iMessage('title', 'notifications')}
              total={notifications.length}
              notifications={notifications}
            />
          </div>
          <Divider />
          <List className={classes.wrapper}>
            {notifications.slice(0, 10).map((notification) => (
              <WithStylesItem
                {...notification}
                key={notification.id}
                onClick={onViewPackage}
              />
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid
        item
        sm={12}
        md={active ? 4 : 2}
        lg={active ? 4 : 2}
        xl={active ? 4 : 2}
        className={classes.transition}
      >
        {active && <NotificationDetails active={active} mode={mode} />}
      </Grid>
    </Grid>
  );
};

NotificationsList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  onViewPackage: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  active: PropTypes.object,
};

export default withStyles(styles)(NotificationsList);
