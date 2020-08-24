import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import MuiIcon from '@material-ui/core/Icon';
import { ICON } from 'styles/common';

const Icon = ({
  className,
  left,
  right,
  front,
  frontFlipped,
  caret,
  link,
  linkInverted,
  contained,
  white,
  purple,
  text,
  light,
  ...props
}) => (
  <MuiIcon
    className={cx(
      ICON.root,
      className,
      left && ICON.left,
      right && ICON.right,
      front && ICON.front,
      link && ICON.link,
      frontFlipped && ICON.frontFlipped,
      linkInverted && ICON.linkInverted,
      caret && ICON.caret,
      contained && ICON.contained,
      white && ICON.white,
      purple && ICON.purple,
      text && ICON.text,
      light && ICON.light
    )}
    {...props}
  />
);

Icon.propTypes = {
  className: PropTypes.string,
  left: PropTypes.bool,
  right: PropTypes.bool,
  front: PropTypes.bool,
  frontFlipped: PropTypes.bool,
  caret: PropTypes.bool,
  link: PropTypes.string,
  linkInverted: PropTypes.bool,
  contained: PropTypes.bool,
  white: PropTypes.string,
  purple: PropTypes.string,
  text: PropTypes.bool,
  light: PropTypes.bool
};

export default Icon;
