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

const styles = theme => ({
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    margin: `0 ${theme.spacing.unit * 2}px`
  }
});

const AppLoader = props => {
  const { loading, classes, children, small } = props;

  return loading ? (
    <React.Fragment>
      <CircularProgress
        className={cn({
          [classes.loader]: !Boolean(small)
        })}
        color={small ? 'primary' : 'secondary'}
        size={small ? 20 : 40}
      />
    </React.Fragment>
  ) : (
    children
  );
};

// AppLoader.propTypes = {
//   classes: objectOf(object).isRequired,
//   children: objectOf(object).isRequired,
//   loading: bool.isRequired
// };

export default withStyles(styles)(AppLoader);
