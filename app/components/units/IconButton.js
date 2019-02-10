/* eslint-disable react/require-default-props */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import MuiIconButton from '@material-ui/core/IconButton';
import { ICON_BUTTON } from 'styles/common';

const IconButton = ({
  className,
  shaded,
  noPad,
  narrowPad,
  separated,
  linkInverted,
  danger,
  success,
  ...props
}) => (
  <MuiIconButton
    className={cx(
      ICON_BUTTON.root,
      className,
      shaded && ICON_BUTTON.shaded,
      noPad && ICON_BUTTON.noPad,
      narrowPad && ICON_BUTTON.narrowPad,
      separated && ICON_BUTTON.separated,
      linkInverted && ICON_BUTTON.linkInverted,
      danger && ICON_BUTTON.danger,
      success && ICON_BUTTON.success
    )}
    {...props}
  />
);

IconButton.propTypes = {
  className: PropTypes.string,
  shaded: PropTypes.string,
  noPad: PropTypes.bool,
  narrowPad: PropTypes.bool,
  separated: PropTypes.bool,
  linkInverted: PropTypes.bool,
  danger: PropTypes.string,
  success: PropTypes.string
};

export default IconButton;
