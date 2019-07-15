/* eslint-disable object-shorthand */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useState } from 'react';

import { withStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CloseIcon from '@material-ui/icons/CloseOutlined';

import { iMessage, switchcase, showDialog } from 'commons/utils';
import { Dot } from 'components/common';

import styles from '../styles/advisories';

const ActionsMenu = ({ handler }) => {
  const ITEM_HEIGHT = 48;
  const moreActions = [
    { label: 'Fix only prod', value: 'onlyProd' },
    { label: 'Fix only dev', value: 'onlyDev' }
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <IconButton
        aria-label="More"
        aria-controls="audit-actions"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="audit-actions"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        {moreActions.map(action => (
          <MenuItem key={action.value} onClick={() => handler(action.value)}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

ActionsMenu.propTypes = {
  handler: PropTypes.func.isRequired
};

const Advisories = ({ classes, data, handleClick }) => {
  const keys = Object.keys(data).map(key => key);
  const zeroKeys = !keys.length;

  const handleFix = option => {
    const auditText = switchcase({
      fix: () => 'auditFix',
      force: () => 'auditFixForce',
      onlyProd: () => 'auditFixOnlyProd',
      onlyDev: () => 'auditFixOnlyDev'
    })('auditFix')(option);

    const dialogOptions = {
      title: 'Confirmation',
      type: 'question',
      message: iMessage('confirmation', auditText),
      buttons: ['Cancel', 'Fix']
    };

    const dialogHandler = () => {};

    return showDialog(dialogHandler, dialogOptions);
  };

  if (zeroKeys) {
    return (
      <div className={classes.container}>
        <Typography
          variant="subtitle1"
          className={cn(classes.noData, classes.withPadding)}
          color="textSecondary"
        >
          {iMessage('info', 'no_audit_issues')}
        </Typography>
      </div>
    );
  }

  return (
    <Paper className={classes.root}>
      <Toolbar disableGutters>
        <div className={classes.header}>
          <Typography
            variant="h5"
            color="textSecondary"
            className={classes.title}
          >
            {iMessage('title', 'issues')}({keys.length})
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => handleFix('fix')}
          >
            Fix
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => handleFix('force')}
            className={classes.marLeft}
          >
            Fix with force
          </Button>
          <ActionsMenu handler={handleFix} />
        </div>
      </Toolbar>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textPrimary" variant="subtitle1">
                  {iMessage('label', 'module_name')}
                </Typography>
              </TableCell>
              <Hidden smDown>
                <TableCell>
                  <Typography color="textPrimary" variant="subtitle1">
                    {iMessage('label', 'title')}
                  </Typography>
                </TableCell>
              </Hidden>
              <Hidden mdDown>
                <TableCell>
                  <Typography color="textPrimary" variant="subtitle1">
                    {iMessage('label', 'patched_versions')}
                  </Typography>
                </TableCell>
              </Hidden>
              <Hidden lgDown>
                <TableCell>
                  <Typography color="textPrimary" variant="subtitle1">
                    {iMessage('label', 'vulnerable_versions')}
                  </Typography>
                </TableCell>
              </Hidden>
              <Hidden lgDown>
                <TableCell>
                  <Typography color="textPrimary" variant="subtitle1">
                    {iMessage('label', 'severity')}
                  </Typography>
                </TableCell>
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(data).map(
              (
                {
                  title,
                  module_name,
                  severity,
                  patched_versions,
                  vulnerable_versions,
                  ...rest
                },
                idx
              ) => (
                <TableRow
                  hover
                  onClick={() =>
                    handleClick({
                      ...rest,
                      name: module_name,
                      title: title
                    })
                  }
                  key={keys[idx]}
                  className={classes.tableRow}
                >
                  <TableCell className={cn(classes.tableCell, classes.text)}>
                    <Typography color="textSecondary">{module_name}</Typography>
                  </TableCell>
                  <Hidden smDown>
                    <TableCell className={classes.tableCell}>
                      <Typography color="textSecondary">{title}</Typography>
                    </TableCell>
                  </Hidden>
                  <Hidden mdDown>
                    <TableCell>
                      <Typography color="textSecondary">
                        {patched_versions}
                      </Typography>
                    </TableCell>
                  </Hidden>
                  <Hidden lgDown>
                    <TableCell>
                      <Typography color="textSecondary">
                        {vulnerable_versions}
                      </Typography>
                    </TableCell>
                  </Hidden>
                  <Hidden lgDown>
                    <TableCell align="center" className={cn(classes.tableCell)}>
                      <div className={classes.flexContainer}>
                        {switchcase({
                          critical: () => <Dot size="large" color="error" />,
                          high: () => <Dot size="large" color="secondary" />,
                          moderate: () => <Dot size="large" color="warning" />,
                          low: () => <Dot size="large" color="primary" />
                        })(<Dot size="large" color="primary" />)(severity)}
                        {rest.deleted && <CloseIcon color="error" />}
                      </div>
                    </TableCell>
                  </Hidden>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

Advisories.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
      PropTypes.string
    ])
  ),
  handleClick: PropTypes.func
};

export default withStyles(styles, {
  withTheme: true
})(Advisories);
