import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes, { string, bool } from 'prop-types';
import cn from 'classnames';

import styles from './styles';

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
  const btnClasses = cn({
    [classes[color]]: color,
    [classes.round]: round,
    [classes.border]: border,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
  });

  return (
    <Button {...restProps} className={cn(classes.button, btnClasses)}>
      {children}
    </Button>
  );
};

AppButton.defaultProps = {
  color: 'transparent',
};

AppButton.propTypes = {
  classes: PropTypes.objectOf(string).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.oneOf([
    'info',
    'warning',
    'error',
    'transparent',
    'primary',
    'secondary',
    'simple',
  ]),
  round: bool,
  border: bool,
  fullWidth: bool,
  disabled: bool,
};

export default withStyles(styles)(AppButton);
