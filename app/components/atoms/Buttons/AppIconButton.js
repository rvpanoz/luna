/* eslint-disable react/require-default-props */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import cn from 'classnames';
import iconButtonStyle from './styles/iconButtonStyle';

const AppIconButton = ({
  classes,
  color,
  children,
  customClass,
  ...restProps
}) => (
  <IconButton
    {...restProps}
    className={cn(classes.button, {
      [classes[color]]: Boolean(color),
      [classes[customClass]]: Boolean(customClass)
    })}
  >
    <Icon>{children}</Icon>
  </IconButton>
);

AppIconButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.arrayOf(PropTypes.object),
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
