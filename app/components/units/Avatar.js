/* eslint-disable react/require-default-props */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import MuiAvatar from '@material-ui/core/Avatar';
import { AVATAR } from 'styles/common';

const Avatar = ({
  className,
  bordered,
  link,
  small,
  medium,
  ultraLarge,
  ...props
}) => (
  <MuiAvatar
    className={cx(
      AVATAR.root,
      className,
      bordered && AVATAR.bordered,
      link && AVATAR.link,
      small && AVATAR.small,
      medium && AVATAR.medium,
      ultraLarge && AVATAR.ultraLarge
    )}
    {...props}
  />
);

Avatar.propTypes = {
  className: PropTypes.string,
  bordered: PropTypes.bool,
  link: PropTypes.string,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  ultraLarge: PropTypes.bool
};

export default Avatar;
