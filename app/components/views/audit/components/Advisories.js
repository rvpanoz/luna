import React from 'react';
import { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { defaultFont } from 'styles/variables'
import { withStyles } from '@material-ui/core';
import { iMessage, switchcase } from "commons/utils";

import { Dot } from 'components/common';

const Advisories = ({ classes, data }) => {
  const [active, setActive] = useState(null)
  const keys = Object.keys(data).map(key => key);

  return (
    <Grid container>
      <Grid item md={active ? 8 : 12}
        lg={active ? 8 : 12}
        xl={active ? 8 : 12}>
        <Paper className={classes.root}>
          <div className={classes.toolbar}>
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
                <Hidden mdDown>
                  <Button>Run fix</Button>
                </Hidden>
              </div>
            </Toolbar>
          </div>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} padding="dense">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle1">{iMessage('label', 'module_name')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle1">{iMessage('label', 'title')}</Typography>
                  </TableCell>
                  <Hidden mdDown>
                    <TableCell>
                      <Typography color="textSecondary" variant="subtitle1">{iMessage('label', 'patched_versions')}</Typography>
                    </TableCell>
                  </Hidden>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle1">{iMessage('label', 'severity')}</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(data).map(({ title, module_name, severity, deleted, patched_versions, ...rest }, idx) => (
                  <TableRow onClick={() => setActive(rest)} key={keys[idx]} className={classes.tableRow}>
                    <TableCell className={classes.tableCell}>
                      <Typography color="textSecondary">{module_name}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography color="textSecondary">{title}</Typography>
                    </TableCell>
                    <Hidden mdDown>
                      <TableCell>
                        <Typography color="textSecondary">{patched_versions}</Typography>
                      </TableCell>
                    </Hidden>
                    <TableCell align="center" className={cn(classes.tableCell)}>
                      {switchcase({
                        critical: () => <Dot large color="error" />,
                        high: () => <Dot large color="secondary" />,
                        moderate: () => <Dot large color="warning" />,
                        low: () => <Dot large color="primary" />
                      })(<Dot large textCenter />)(severity)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </Grid>
    </Grid>
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

  },
  tableRow: {
    border: 'none',
    padding: 10,
    lineHeight: '1.1',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  table: {
    width: '100%',
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
  cellCenter: {
    textAlign: 'center'
  },
  toolbar: {
    width: '100%'
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
    display: 'flex',
    flex: '0 0 auto',
    padding: theme.spacing.unit,
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
}

export default withStyles(styles)(Advisories);
