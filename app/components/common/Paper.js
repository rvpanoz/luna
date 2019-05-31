import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { grayColor } from 'styles/variables';

import Paper from '@material-ui/core/Paper';

const styles = theme => {
  return {
    root: {
      borderRadius: '4px'
    },
    squared: {
      borderRadius: 0
    },
    outlined: {
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${grayColor}`
    }
  };
};

const CustomPaper = props => {
  const { classes, className, outlined, squared, children, ...rest } = props;

  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.squared]: squared,
      [classes.outlined]: outlined
    },
    className
  );

  return (
    <Paper {...rest} className={rootClassName}>
      {children}
    </Paper>
  );
};

CustomPaper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  elevation: PropTypes.number,
  outlined: PropTypes.bool,
  squared: PropTypes.bool
};

CustomPaper.defaultProps = {
  squared: false,
  outlined: true,
  elevation: 0
};

export default withStyles(styles)(CustomPaper);
