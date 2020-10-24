import React from 'react';
import PropTypes, { arrayOf, objectOf, string, func } from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/styles';
import { Table, TableBody, Grid, Paper, Divider } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import InfoIcon from '@material-ui/icons/InfoTwoTone';
import Typography from '@material-ui/core/Typography';

import { HelperText } from 'components/common';
import { iMessage } from 'commons/utils';
import TableHeader from './Header';
import Toolbar from './Toolbar';
import PackageDetails from 'components/packages/PackageDetails';
import styles from './styles/notifications';

const NotificationItem = ({
  classes,
  id,
  selected,
  handleSelectOne,
  onClick,
  ...restProps
}) => {
  const {
    requiredName,
    requiredVersion,
    minVersion,
    reason,
    requiredByName,
  } = restProps;
  const isSelected = selected.indexOf(id) !== -1;

  return (
    <TableRow
      key={id}
      aria-checked={isSelected}
      tabIndex={-1}
      selected={isSelected}
      classes={{
        root: classes.tableRow,
      }}
      onClick={() => onClick(requiredName, minVersion)}
    >
      <TableCell className={cn(classes.tableCell, classes.cellText)}>
        <div className={classes.flex}>
          <Typography variant="subtitle2" className={classes.name}>
            {requiredName}
          </Typography>
          <Typography variant="subtitle2">{requiredByName}</Typography>
        </div>
      </TableCell>
      <TableCell className={cn(classes.tableCell, classes.cellText)}>
        <div className={classes.flex}>
          <Typography variant="subtitle2" className={classes.name}>
            {requiredVersion}
          </Typography>
        </div>
      </TableCell>
    </TableRow>
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
  selected,
  loading,
  handleSelectAll,
  handleSelectOne,
  handleInstall,
  active,
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
            <Toolbar
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
                [classes.hasFilterBlur]: loading,
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
                {notifications.slice(0, 10).map((notification) => (
                  <WithStylesItem
                    {...notification}
                    key={notification.id}
                    selected={selected}
                    handleSelectOne={handleSelectOne}
                    handleSelectAll={handleSelectAll}
                    onClick={onViewPackage}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
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
        <PackageDetails showCommandOptions={() => {}} notification />
      </Grid>
    </Grid>
  );
};

NotificationsList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.objectOf(PropTypes.string),
  onViewPackage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default withStyles(styles)(NotificationsList);
