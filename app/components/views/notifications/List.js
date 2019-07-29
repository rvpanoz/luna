import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Grid,
  Paper,
  Divider
} from '@material-ui/core';

import { HelperText } from 'components/common';
import { iMessage } from 'commons/utils';
import ToolbarView from './Toolbar';

import styles from './styles/list';

const noop = () => {};

const NotificationsList = ({ classes, className, notifications, ...rest }) => {
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { users } = props;

    let selectedNotifications;

    if (event.target.checked) {
      selectedNotifications = notifications.map(user => user.id);
    } else {
      selectedNotifications = [];
    }

    setSelected(selectedNotifications);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = notifications.indexOf(id);
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

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const noNotifications = !notifications || notifications.length === 0;

  return (
    <Grid container>
      <Grid item sm={12} className={classes.transition}>
        {noNotifications && (
          <HelperText text={iMessage('info', 'noNotifications')} />
        )}
        {!noNotifications && (
          <Paper className={classes.paper} elevation={2}>
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.length === notifications.length}
                        color="primary"
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < notifications.length
                        }
                        onChange={noop}
                      />
                    </TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Required</TableCell>
                    <TableCell>Required by</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notifications.slice(0, rowsPerPage).map(notification => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={notification.id}
                      selected={selected.indexOf(notification.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.indexOf(notification.id) !== -1}
                          color="primary"
                          onChange={noop}
                          value="true"
                        />
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography
                          className={classes.cellText}
                          variant="body1"
                        >
                          {notification.body}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography className={classes.cellText}>
                          {notification.required}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography className={classes.cellText}>
                          {notification.requiredBy}
                        </Typography>
                      </TableCell>
                    </TableRow>
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
  notifications: PropTypes.array.isRequired
};

export default withStyles(styles)(NotificationsList);
