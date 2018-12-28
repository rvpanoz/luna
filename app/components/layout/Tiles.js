/* eslint-disable */

/**
 * Grid tiles component
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import styles from '../styles/gridTiles';

const GridTiles = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={2}>
      render something..
    </Paper>
  );
};

export default withStyles(styles)(GridTiles);
