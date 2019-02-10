/* eslint-disable react/require-default-props */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import MuiDivider from '@material-ui/core/Divider';
import { DIVIDER } from 'styles/common';

const Divider = ({ className, vertical, ...props }) => (
  <MuiDivider
    className={cx(DIVIDER.root, className, vertical && DIVIDER.vertical)}
    {...props}
  />
);

Divider.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool
};

export default Divider;
