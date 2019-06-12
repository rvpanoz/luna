/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from './styles/doctor';

const renderData = data => {
  return null;
};

const Doctor = ({ classes, data }) => {
  if (!data) {
    return (
      <div className={classes.containerHolder}>
        <Typography
          variant="subtitle1"
          className={cn(classes.noData, classes.withPadding)}
        >
          No doctor data
        </Typography>
      </div>
    );
  }

  const { content } = data || {};

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <div className={classes.flexContainer}>
            <div className={classes.header}>
              <Typography variant="h6" className={classes.title}>
                Doctor report
              </Typography>
            </div>
          </div>
          <Divider light />
          <div className={classes.topSection}>{renderData(content)}</div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

Doctor.defaultProps = {
  data: null
};

Doctor.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
      PropTypes.string
    ])
  )
};

export default withStyles(styles)(Doctor);
