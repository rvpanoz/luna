/* eslint-disable react/require-default-props */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import MuiTypography from '@material-ui/core/Typography';
import { TEXT } from 'styles/common';

const Typography = ({
  className,
  bold,
  inline,
  link,
  linkInverted,
  icon,
  inverted,
  indented,
  indentedLarge,
  light,
  lightWeight,
  primary,
  secondary,
  tertiary,
  success,
  danger,
  ...props
}) => (
  <MuiTypography
    className={cx(
      TEXT.root,
      className,
      bold && TEXT.bold,
      inline && TEXT.inline,
      icon && TEXT.icon,
      link && TEXT.link,
      linkInverted && TEXT.linkInverted,
      inverted && TEXT.inverted,
      indented && TEXT.indented,
      indentedLarge && TEXT.indentedLarge,
      light && TEXT.light,
      lightWeight && TEXT.lightWeight,
      primary && TEXT.primary,
      secondary && TEXT.secondary,
      tertiary && TEXT.tertiary,
      success && TEXT.success,
      danger && TEXT.danger
    )}
    {...props}
  />
);

Typography.propTypes = {
  className: PropTypes.string,
  bold: PropTypes.bool,
  inline: PropTypes.bool,
  link: PropTypes.string,
  linkInverted: PropTypes.string,
  icon: PropTypes.string,
  inverted: PropTypes.bool,
  indented: PropTypes.bool,
  indentedLarge: PropTypes.bool,
  light: PropTypes.bool,
  lightWeight: PropTypes.string,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  tertiary: PropTypes.string,
  success: PropTypes.string,
  danger: PropTypes.string
};

export default Typography;
