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
import NotificationDetails from './NotificationDetails';
import ToolbarView from './Toolbar';

import styles from './styles/list';

const NotificationsList = ({
  active,
  classes,
  notifications,
  selected,
  loading,
  handleSelectAll,
  handleSelectOne,
  handleInstall,
  setActive
}) => {
  const noNotifications = !notifications || notifications.length === 0;

  return (
    <Grid container>
      <Grid
        item
        item
        md={active ? 6 : 10}
        lg={active ? 6 : 10}
        xl={active ? 6 : 10}
        className={classes.transition}
      >
        {noNotifications && (
          <HelperText text={iMessage('info', 'noNotifications')} />
        )}
        {!noNotifications && (
          <Paper elevation={2}>
            <div className={classes.toolbar}>
              <ToolbarView
                title={iMessage('title', 'notifications')}
                total={notifications.length}
                selected={selected}
                notifications={notifications}
                handleInstall={handleInstall}
              />
            </div>
            <Divider />
            <div className={classes.tableWrapper}>
              <Table
                aria-labelledby="notifications-list"
                className={cn(classes.table, {
                  [classes.hasFilterBlur]: loading
                })}
              >
                <TableHeader
                  total={notifications.length}
                  handleSelectAll={handleSelectAll}
                  selected={selected}
                  sortBy="Required"
                  sortDir="asc"
                />
                <TableBody>
                  {notifications.slice(0, 10).map(notification => (
                    <NotificationItem
                      {...notification}
                      key={notification.id}
                      selected={selected}
                      handleSelectOne={handleSelectOne}
                      handleSelectAll={handleSelectAll}
                      setActive={setActive}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        )}
      </Grid>
      <Grid
        item
        sm={12}
        md={active ? 6 : 2}
        lg={active ? 6 : 2}
        xl={active ? 6 : 2}
        className={classes.transition}
      >
        {active && (
          <NotificationDetails active={active} setActive={setActive} />
        )}
      </Grid>
    </Grid>
  );
};

NotificationsList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  handleSelectOne: PropTypes.func.isRequired,
  handleInstall: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default withStyles(styles)(NotificationsList);
