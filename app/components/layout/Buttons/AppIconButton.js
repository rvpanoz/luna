/* eslint-disable  */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

import iconButtonStyle from '../../styles/iconButtonStyle';

const AppIconButton = ({
  classes,
  color,
  children,
  customClass,
  ...restProps
}) => (
  <IconButton
    {...restProps}
    className={
      classes.button +
      (color ? ' ' + classes[color] : '') +
      (customClass ? ' ' + customClass : '')
    }
  >
    {children}
  </IconButton>
);

AppIconButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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

export default withStyles(iconButtonStyle)(AppIconButton);
