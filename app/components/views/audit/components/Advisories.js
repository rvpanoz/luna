/* eslint-disable object-shorthand */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useState } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
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
import AdvisoryDetails from './AdvisoryDetails';
import ListDotTypes from './ListDotTypes';
import ListTypes from './ListTypes';
import styles from '../styles/advisories';

const ITEM_HEIGHT = 48;
const moreActions = [
  { label: iMessage('action', 'runAuditFixProd'), value: 'onlyProd' },
  { label: iMessage('action', 'runAuditFixDev'), value: 'onlyDev' },
  { label: iMessage('action', 'runAuditFixLock'), value: 'onlyLock' },
  { label: iMessage('action', 'runAuditFix'), value: 'fix' },
  { label: iMessage('action', 'runAuditFixForce'), value: 'force' },
];

const ActionsMenu = ({ handler }) => {
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
        {moreActions.map(action => {
          const { value, label } = action;

          return <MenuItem key={value} onClick={() => handler(value)}>
            {label}
          </MenuItem>
        })}
      </Menu>
    </div>
  );
};

ActionsMenu.propTypes = {
  handler: PropTypes.func.isRequired
};

const Advisories = ({ classes, data, handleAudit, vulnerabilities }) => {
  const [active, setActive] = useState(null)
  const keys = Object.keys(data).map(key => key);
  const zeroKeys = keys.length === 0;

  const handleFix = option => {
    const auditText = switchcase({
      fix: () => 'auditFix',
      force: () => 'auditFixForce',
      onlyProd: () => 'auditFixOnlyProd',
      onlyDev: () => 'auditFixOnlyDev',
      onlyLock: () => 'auditFixOnlyLock'
    })('auditFix')(option);

    const dialogOptions = {
      title: 'Confirmation',
      type: 'question',
      message: iMessage('confirmation', auditText),
      buttons: ['Cancel', 'Fix']
    };

    const dialogHandler = () => handleAudit(option);

    return showDialog(dialogHandler, dialogOptions);
  };

  return (
    <Grid container spacing={8} className={classes.gridContainer}>
      <Grid item sm={8}>
        <ListDotTypes data={vulnerabilities} />
      </Grid>
      <Grid
        item
        sm={12}
        md={6}
        lg={6}
        xl={6}
        className={classes.transition}
      >
        <Paper className={classes.root}>
          <Toolbar disableGutters>
            <div className={classes.header}>
              <Typography variant="h6" color="textSecondary">
                {iMessage('title', 'issues')}&nbsp;({keys.length})
              </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => handleAudit()}
              >
                <Icon>send</Icon>&nbsp;
                {iMessage('action', 'runAudit')}
              </Button>
              <Hidden mdDown>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => handleFix('fix')}
                  disabled={Boolean(zeroKeys)}
                  className={classes.marLeft}
                >
                  <Icon>update</Icon>&nbsp;
                  {iMessage('action', 'runAuditFix')}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleFix('force')}
                  disabled={Boolean(zeroKeys)}
                  className={classes.marLeft}
                  color="primary"
                >
                  <Icon>low_priority</Icon>&nbsp;
                  {iMessage('action', 'runAuditFixForce')}
                </Button>
              </Hidden>
              <ActionsMenu handler={handleFix} />
            </div>
          </Toolbar>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle1">
                      {iMessage('label', 'moduleName')}
                    </Typography>
                  </TableCell>
                  <Hidden mdDown>
                    <TableCell>
                      <Typography color="textPrimary" variant="subtitle1">
                        {iMessage('label', 'title')}
                      </Typography>
                    </TableCell>
                  </Hidden>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle1" align="center">
                      {iMessage('label', 'severity')}
                    </Typography>
                  </TableCell>
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
                          setActive({
                            ...rest,
                            name: module_name,
                            title: title,
                            severity,
                            vulnerable_versions
                          })
                        }
                        key={keys[idx]}
                        className={classes.tableRow}
                      >
                        <TableCell className={cn(classes.tableCell, classes.text)}>
                          <div className={classes.flexContainer}>
                            {rest.deleted && <CloseIcon color="error" />}
                            <Typography color="textSecondary" variant="body1">{module_name}</Typography>
                          </div>
                        </TableCell>
                        <Hidden mdDown>
                          <TableCell className={classes.tableCell}>
                            <Typography color="textSecondary" variant="body1">{title}</Typography>
                          </TableCell>
                        </Hidden>
                        <TableCell className={classes.tableCell}>
                          <div />
                          <div className={cn(classes.flexContainer, classes.flexCenter)}>
                            {switchcase({
                              critical: () => <Dot size="large" color="error" />,
                              high: () => <Dot size="large" color="secondary" />,
                              moderate: () => <Dot size="large" color="warning" />,
                              low: () => <Dot size="large" color="primary" />
                            })(<Dot size="large" color="primary" />)(severity)}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </Grid>
      <Grid item sm={12}
        md={6}
        lg={6}
        xl={6}>
        {active ? <AdvisoryDetails data={active} onClose={() => setActive(null)} /> : <ListTypes data={data} />}
      </Grid>
    </Grid>
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
  vulnerabilities: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  handleAudit: PropTypes.func.isRequired
};

export default withStyles(styles, {
  withTheme: true
})(Advisories);
