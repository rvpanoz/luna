/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  paperBody: {
    color: theme.palette.common.black,
    padding: '0.75rem 1.25rem',
    marginBottom: '0',
    borderBottom: 'none',
    background: 'transparent',
    zIndex: '3 !important'
  }
});

const paperBody = ({ ...props }) => {
  const { classes, className, children, ...rest } = props;

  const paperBodyClasses = classNames({
    [classes.paperBody]: true,
    [className]: className !== undefined
  });

  return (
    <div className={paperBodyClasses} {...rest}>
      {children}
    </div>
  );
};

paperBody.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(paperBody);
