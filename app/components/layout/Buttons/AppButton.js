/* eslint-disable  */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes, { string, bool } from 'prop-types';
import cx from 'classnames';

import buttonStyle from '../../styles/buttonStyle';

const AppButton = ({
  classes,
  color,
  round,
  children,
  fullWidth,
  disabled,
  ...restProps
}) => {
  const btnClasses = cx({
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled
  });

  return (
    <Button {...restProps} className={classes.button + ' ' + btnClasses}>
      {children}
    </Button>
  );
};

AppButton.propTypes = {
  classes: PropTypes.objectOf(string).isRequired,
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
    'simple',
    'transparent'
  ]),
  round: bool,
  fullWidth: bool,
  disabled: bool
};

export default withStyles(buttonStyle)(AppButton);
