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

import styles from './styles/appLoader';

const AppLoader = ({ loading, classes, className, children, message, relative, mini }) =>
  loading ? (
    <div
      className={cn(classes.loader, {
        [classes.relative]: relative,
        [className]: className
      })}
    >
      <CircularProgress
        className={classes.progress}
        color={relative ? 'primary' : 'secondary'}
        size={mini ? 20 : 30}
      />
      {message && (
        <Typography variant="body2" color="textSecondary" className={classes.message}>
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
  mini: bool,
  className: string,
};

export default withStyles(styles)(AppLoader);
