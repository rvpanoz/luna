/**
 * Loader
 */

/* eslint-disable */

import { withStyles } from '@material-ui/core/styles';
import { bool, object } from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const styles = theme => ({
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    margin: `0 ${theme.spacing.unit * 2}px`
  }
});

const Loader = props => {
  const { loading, classes, children } = props;

  return loading ? (
    <CircularProgress className={classes.loader} color="secondary" />
  ) : (
    children
  );
};

Loader.propTypes = {
  classes: object,
  loading: bool,
  children: object
};

export default withStyles(styles)(Loader);
