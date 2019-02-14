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

const styles = theme => ({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '45%',
    top: '100%',
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  relative: {
    left: '45%',
    position: 'relative',
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  margin: {
    margin: '10px 0'
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
        color={relative ? 'primary' : 'secondary'}
        size={mini ? 20 : 30}
      />
      {message && (
        <Typography className={classes.margin} variant="caption">
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
