/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import { withStyles } from '@material-ui/core/styles';

import styles from './styles/snackbarContentStyle';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
  primary: () => {}
};

const AppSnackbarContent = props => {
  const { classes, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], classes.root)}
      aria-describedby="cli-snackbar"
      message={
        <Typography variant="body2" className={classes.message}>
          {variant !== 'primary' && (
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
          )}
          {message}
        </Typography>
      }
      action={[
        typeof onClose === 'function' && (
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        )
      ]}
      {...other}
    />
  );
};

AppSnackbarContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'primary'])
    .isRequired
};

const AppSnackbarContentWrapper = withStyles(styles)(AppSnackbarContent);
export default AppSnackbarContentWrapper;
