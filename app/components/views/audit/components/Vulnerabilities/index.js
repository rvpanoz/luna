/* eslint-disable react/require-default-props */
/* eslint-disable compat/compat */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import cn from 'classnames';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { iMessage } from 'commons/utils';
import styles from './styles';

const Vulnerabilities = ({ classes, values, advisories }) => {
  const total = Object.values(values).reduce((sum, value) => sum + value, 0);
  const advisoriesValues = Object.values(advisories);

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Typography
          gutterBottom
          variant="h6"
        >{`Vulnerabilities ${total}`}</Typography>
        <Typography color="textSecondary" variant="body2">
          {iMessage('info', 'npmAuditVulnerabiliesFound', { '%total%': total })}
        </Typography>
      </div>
      <Divider light />
      <div className={classes.section2}>
        <Grid container style={{ maxWidth: 200 }}>
          <Grid item>
            <Typography gutterBottom variant="body1">
              Types
            </Typography>
            <div className={classes.types}>
              <Chip
                className={cn(classes.chip, classes.errorColor)}
                label={`Critical: ${values.critical}`}
              />
              <Chip
                className={cn(classes.chip, classes.primaryColor)}
                label={`Low: ${values.low}`}
              />
              <Chip
                className={cn(classes.chip, classes.warningColor)}
                label={`Moderate: ${values.moderate}`}
              />
              <Chip
                className={cn(classes.chip, classes.secondaryColor)}
                label={`High: ${values.high}`}
              />
            </div>
          </Grid>
        </Grid>
        {advisoriesValues.length ? (
          <Grid container>
            <Grid item>
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow className={classes.tableRow}>
                      <TableCell className={classes.tableHeadCell}>
                        Severity
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Title
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Module
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Vulnerable version
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Recommendation
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Reported by
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Access
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Updated
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {advisoriesValues.map(av => {
                      const { name } = av.reported_by || {};

                      return (
                        <TableRow key={av.id}>
                          <TableCell className={classes.tableCell}>
                            {av.severity}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {av.title}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {av.module_name}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {av.vulnerable_versions}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {av.recommendation}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {name}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {av.access}
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            {av.updated}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Grid>
          </Grid>
        ) : null}
      </div>
    </div>
  );
};

Vulnerabilities.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  values: PropTypes.objectOf(PropTypes.number),
  advisories: PropTypes.objectOf(PropTypes.object)
};

export default withStyles(styles)(Vulnerabilities);
