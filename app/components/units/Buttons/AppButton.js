/* eslint-disable react/require-default-props */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes, { string, bool } from 'prop-types';
import cx from 'classnames';
import buttonStyle from './styles/buttonStyle';

const AppButton = ({
  classes,
  color,
  round,
  border,
  children,
  fullWidth,
  disabled,
  ...restProps
}) => {
  const btnClasses = cx({
    [classes[color]]: color,
    [classes.round]: round,
    [classes.border]: border,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled
  });

  return (
    <Button {...restProps} className={cx(classes.button, btnClasses)}>
      {children}
    </Button>
  );
};

AppButton.defaultProps = {
  color: 'transparent'
};

AppButton.propTypes = {
  classes: PropTypes.objectOf(string).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.oneOf([
    'info',
    'success',
    'warning',
    'error',
    'transparent',
    'primary',
    'secondary',
    'secondaryLarge',
    'simple'
  ]),
  round: bool,
  border: bool,
  fullWidth: bool,
  disabled: bool
};

export default withStyles(buttonStyle)(AppButton);
