/* eslint-disable react/require-default-props */

import React from 'react';
import {
  array,
  bool,
  symbol,
  objectOf,
  node,
  oneOfType,
  string
} from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const styles = () => ({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-around',
    left: '50%',
    top: '40%',
    padding: 0,
    margin: 0
  },
  relative: {
    left: '50%',
    position: 'relative'
  },
  progress: {
    padding: 0,
    margin: 0
  },
  message: {
    padding: 0,
    margin: 0
  }
});

const AppLoader = ({ loading, classes, children, message, relative, mini }) =>
  loading ? (
    <div
      className={cn(classes.loader, {
        [classes.relative]: relative
      })}
    >
      <CircularProgress
        className={classes.progress}
        color={relative ? 'primary' : 'secondary'}
        size={mini ? 20 : 30}
      />
      {message && (
        <Typography className={classes.message} variant="caption">
          {message}
        </Typography>
      )}
    </div>
  ) : (
    children
  );

AppLoader.propTypes = {
  classes: objectOf(string).isRequired,
  loading: bool.isRequired,
  children: oneOfType([node, array, symbol]),
  message: string,
  relative: bool,
  mini: bool
};

export default withStyles(styles)(AppLoader);
