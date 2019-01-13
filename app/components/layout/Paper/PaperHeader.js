/* eslint-disable */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  paperHeader: {
    padding: '0.75rem 1.25rem',
    marginBottom: '0',
    borderBottom: 'none',
    background: 'transparent',
    zIndex: '3 !important',
    '&:first-child': {
      borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0'
    }
  },
  paperHeaderPlain: {
    marginLeft: '0px !important',
    marginRight: '0px !important'
  }
};

const paperHeader = ({ ...props }) => {
  const { classes, className, children, color, plain, ...rest } = props;

  const paperHeaderClasses = classNames({
    [classes.paperHeader]: true,
    [classes[color + 'paperHeader']]: color,
    [classes.paperHeaderPlain]: plain,
    [className]: className !== undefined
  });

  return (
    <div className={paperHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

paperHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose'
  ]),
  plain: PropTypes.bool
};

export default withStyles(styles)(paperHeader);
