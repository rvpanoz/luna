import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import MuiChip from '@material-ui/core/Chip';
import { CHIP } from 'styles/common';

const Chip = ({ className, inverted, ...props }) => (
  <MuiChip
    className={cx(CHIP.root, className, inverted && CHIP.inverted)}
    classes={{
      label: CHIP.label
    }}
    {...props}
  />
);

Chip.propTypes = {
  className: PropTypes.string,
  inverted: PropTypes.bool
};

export default Chip;
