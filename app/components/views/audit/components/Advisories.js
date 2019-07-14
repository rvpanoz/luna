/* eslint-disable object-shorthand */

import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames';
import { useState } from 'react';

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
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

import CloseIcon from '@material-ui/icons/CloseOutlined';
import GavelIcon from '@material-ui/icons/GavelTwoTone';
import BuildIcon from '@material-ui/icons/BuildTwoTone';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { defaultFont, flexContainer } from 'styles/variables'
import { withStyles } from '@material-ui/core';
import { iMessage, switchcase } from "commons/utils";

import { Dot } from 'components/common';

const options = ['Fix only prod', 'Fix only dev'];
const ITEM_HEIGHT = 48

const ActionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <IconButton
        aria-label="More"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const Advisories = ({ classes, data, handleClick }) => {
  const keys = Object.keys(data).map(key => key);
  const zeroKeys = !keys.length;
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperText, setPopperText] = useState('');

  if (zeroKeys) {
    return <div className={classes.container}>
      <Typography
        variant="subtitle1"
        className={cn(classes.noData, classes.withPadding)}
        color="textSecondary"
      >
        {iMessage('info', 'no_audit_issues')}
      </Typography>
    </div>
  }

  // const handleClickAction = (event) => setAnchorEl(anchorEl ? null : event.currentTarget);
  const open = Boolean(anchorEl);

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
          <IconButton
            disableRipple
            aria-label="audit-fix"
            onClick={(e) => {
              setPopperText(iMessage('label', 'run_audit_fix'))
              setAnchorEl(e.currentTarget);
            }}
          >
            <BuildIcon />
          </IconButton>
          <IconButton
            disableRipple
            aria-label="audit-fix-force"
            onClick={(e) => {
              setPopperText(iMessage('label', 'run_with_force'))
              setAnchorEl(e.currentTarget);
            }}
          >
            <GavelIcon />
          </IconButton>
          <Popper id='pop-audit' open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper className={classes.container}>
                  <Typography variant="body1">{popperText}</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
          <ActionsMenu />
        </div>
      </Toolbar>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textPrimary" variant="subtitle1">{iMessage('label', 'module_name')}</Typography>
              </TableCell>
              <Hidden smDown>
                <TableCell>
                  <Typography color="textPrimary" variant="subtitle1">{iMessage('label', 'title')}</Typography>
                </TableCell>
              </Hidden>
              <Hidden mdDown>
                <TableCell>
                  <Typography color="textPrimary" variant="subtitle1">{iMessage('label', 'patched_versions')}</Typography>
                </TableCell>
              </Hidden>
              <Hidden mdDown>
                <TableCell>
                  <Typography color="textPrimary" variant="subtitle1">{iMessage('label', 'vulnerable_versions')}</Typography>
                </TableCell>
              </Hidden>
              <TableCell>
                <Typography color="textPrimary" variant="subtitle1">{iMessage('label', 'severity')}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(data).map(({ title, module_name, severity, patched_versions, vulnerable_versions, ...rest }, idx) => (
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
                <Hidden mdDown>
                  <TableCell>
                    <Typography color="textSecondary">{vulnerable_versions}</Typography>
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
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 4,
  },
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
    alignItems: 'center',
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
