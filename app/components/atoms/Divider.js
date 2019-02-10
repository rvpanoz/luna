import React from 'react';
import cx from 'classnames';
import MuiDivider from '@material-ui/core/Divider';
import { DIVIDER } from 'styles/common';

const Divider = ({ className, vertical, ...props }) => (
  <MuiDivider
    className={cx(DIVIDER.root, className, vertical && DIVIDER.vertical)}
    {...props}
  />
);

export default Divider;
