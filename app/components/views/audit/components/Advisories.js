import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames';

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
import Tooltip from '@material-ui/core/Tooltip';

import CloseIcon from '@material-ui/icons/Close';
import GavelIcon from '@material-ui/icons/GavelRounded';
import LockIcon from '@material-ui/icons/LockRounded';
import BuildIcon from '@material-ui/icons/BuildRounded';

import { defaultFont, flexContainer } from 'styles/variables'
import { withStyles } from '@material-ui/core';
import { iMessage, switchcase } from "commons/utils";

import { Dot } from 'components/common';

const Advisories = ({ classes, data, handleClick }) => {
  const keys = Object.keys(data).map(key => key);

  return (
    <Paper className={classes.root}>
      <Toolbar
        disableGutters
      >
        <div className={classes.header}>
          <Typography variant="h5" color="textSecondary" className={classes.title}>
            {iMessage('title', 'issues')}({keys.length})
                </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title={iMessage('title', 'Run audit fix')}>
            <div>
              <IconButton
                disableRipple
                aria-label="audit-fix"
                onClick={() => { }}
              >
                <BuildIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title={iMessage('title', 'Run audit fix')}>
            <div>
              <IconButton
                disableRipple
                aria-label="audit-fix-package-lock-only"
                onClick={() => { }}
              >
                <LockIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title={iMessage('title', 'Run audit fix')}>
            <div>
              <IconButton
                disableRipple
                aria-label="audit-fix-only-prod"
                onClick={() => { }}
              >
                <GavelIcon />
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </Toolbar>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} padding="dense">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" className={classes.text} variant="subtitle1">{iMessage('label', 'module_name')}</Typography>
              </TableCell>
              <Hidden smDown>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle1" className={classes.text}>{iMessage('label', 'title')}</Typography>
                </TableCell>
              </Hidden>
              <Hidden mdDown>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle1" className={classes.text}>{iMessage('label', 'patched_versions')}</Typography>
                </TableCell>
              </Hidden>
              <TableCell>
                <Typography color="textSecondary" variant="subtitle1" className={classes.text}>{iMessage('label', 'severity')}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(data).map(({ title, module_name, severity, patched_versions, ...rest }, idx) => (
              <TableRow hover onClick={() => handleClick({
                ...rest,
                name: module_name,
                title: title
              })} key={keys[idx]} className={classes.tableRow}>
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
                    <Typography color="textSecondary">{patched_versions}</Typography>
                  </TableCell>
                </Hidden>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper >
  );
};

const styles = theme => ({
  tableWrapper: {
    whiteSpace: 'nowrap',
    padding: theme.spacing.unit,
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
      maxHeight: 450,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    },
  },
  tableRow: {
    border: 'none',
    padding: 10,
    lineHeight: '1.1',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.secondary.ligth
    }
  },
  table: {
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  tableCell: {
    fontSize: 12,
    '& p': {
      overflowWrap: 'break-word'
    }
  },
  flexContainer: {
    ...flexContainer,
    alignItems: 'center'
  },
  cellCenter: {
    textAlign: 'center'
  },
  spacer: {
    flex: '1 1 100%'
  },
  header: {
    flex: '0 0 auto',
    padding: theme.spacing.unit * 2 + 4
  },
  title: {
    ...defaultFont
  },
  text: {
    ...defaultFont,
    fontSize: 12,
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 'auto'
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  actions: {
    ...flexContainer,
    width: '100%',
    justifyContent: 'flex-end',
    padding: theme.spacing.unit * 2
  },
  marLeft: {
    marginLeft: theme.spacing.unit * 2.5
  }
});

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
}

export default withStyles(styles, {
  withTheme: true
})(Advisories);
