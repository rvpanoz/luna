/* eslint-disable */

/**
 * Loader
 * renders a CircularProgress or props.children
 */

import React from 'react';
import { bool, object, objectOf } from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    top: '100%',
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  margin: {
    margin: '10px 0'
  }
});

const AppLoader = props => {
  const { loading, classes, children, small, message } = props;

  return loading ? (
    <div
      className={cn({
        [classes.loader]: !small
      })}
    >
      <CircularProgress
        color={small ? 'primary' : 'secondary'}
        size={small ? 20 : 30}
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
};

AppLoader.defaultProps = {
  message: 'Loading packages..'
};

// AppLoader.propTypes = {
//   classes: objectOf(object).isRequired,
//   children: objectOf(object).isRequired,
//   loading: bool.isRequired
// };

export default withStyles(styles)(AppLoader);
