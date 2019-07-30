/* eslint-disable */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/styles';
import { Table, TableBody, Grid, Paper, Divider } from '@material-ui/core';

import { HelperText } from 'components/common';
import { iMessage } from 'commons/utils';
import TableHeader from './Header';
import NotificationItem from './NotificationItem';
import ToolbarView from './Toolbar';

import styles from './styles/list';

const NotificationsList = ({ classes, notifications, loading }) => {
  const [selected, setSelected] = useState([]);

  const handleSelectAll = e => {
    let selectedNotifications;

    if (event.target.checked) {
      selectedNotifications = notifications.map(
        notification => notification.id
      );
    } else {
      selectedNotifications = [];
    }

    setSelected(selectedNotifications);
  };

  const handleSelectOne = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const noNotifications = !notifications || notifications.length === 0;

  return (
    <Grid container>
      <Grid item sm={10} className={classes.transition}>
        {noNotifications && (
          <HelperText text={iMessage('info', 'noNotifications')} />
        )}
        {!noNotifications && (
          <Paper
            classes={{
              root: classes.paper
            }}
            elevation={2}
          >
            <div className={classes.toolbar}>
              <ToolbarView
                title={iMessage('title', 'notifications')}
                total={notifications.length}
                selected={selected}
                notifications={notifications}
              />
            </div>
            <Divider />
            <div className={classes.tableWrapper}>
              <Table
                className={cn(classes.table, {
                  [classes.hasFilterBlur]: loading
                })}
              >
                <TableHeader
                  handleSelectAll={handleSelectAll}
                  selected={selected}
                  sortBy="Message"
                  sortDir="desc"
                />
                <TableBody>
                  {notifications.slice(0, 10).map(notification => (
                    <NotificationItem
                      {...notification}
                      key={notification.id}
                      selected={selected}
                      handleSelectOne={handleSelectOne}
                      handleSelectAll={handleSelectAll}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

NotificationsList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool
};

export default withStyles(styles)(NotificationsList);
