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
import Toolbar from '../toolbar/Toolbar';
import NotificationDetails from '../details/NotificationDetails';

import styles from './styles';

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
          primary={`${requiredName} ${requiredVersion}`}
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
      <Grid
        item
        md={active ? 8 : 12}
        lg={active ? 8 : 12}
        xl={active ? 8 : 12}
        className={classes.transition}
      >
        <Paper elevation={2}>
          <div className={classes.toolbar}>
            <Toolbar
              title={iMessage('title', 'notifications')}
              total={notifications.length}
              notifications={notifications}
            />
          </div>
          <Divider />
          <List className={classes.wrapper}>
            {notifications.map((notification) => (
              <WithStylesItem
                {...notification}
                key={notification.id}
                onClick={onViewPackage}
              />
            ))}
          </List>
        </Paper>
      </Grid>
      {active && (
        <Grid item sm={4} md={4} lg={4} xl={4} className={classes.transition}>
          {<NotificationDetails active={active} mode={mode} />}
        </Grid>
      )}
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
