/**
 * Loader
 * renders a CircularProgress or props.children
 */

import React from 'react';
import { bool, object, objectOf } from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  classes: objectOf(object).isRequired,
  children: objectOf(object).isRequired,
  loading: bool.isRequired
};

export default withStyles(styles)(Loader);
