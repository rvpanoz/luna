/* eslint-disable  */

import React from 'react';
import { withStyles, IconButton } from 'material-ui';
import PropTypes from 'prop-types';

import iconButtonStyle from 'variables/styles/iconButtonStyle';

function IconCustomButton({ ...props }) {
  const { classes, color, children, customClass, ...rest } = props;
  return (
    <IconButton
      {...rest}
      className={
        classes.button +
        (color ? ' ' + classes[color] : '') +
        (customClass ? ' ' + customClass : '')
      }
    >
      {children}
    </IconButton>
  );
}

IconCustomButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
    'simple'
  ]),
  customClass: PropTypes.string,
  disabled: PropTypes.bool
};

export default withStyles(iconButtonStyle)(IconCustomButton);
