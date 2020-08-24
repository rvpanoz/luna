import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import MuiBadge from '@material-ui/core/Badge';
import { BADGE } from 'styles/common';

const Badge = ({ className, dotted, number, children, ...props }) => (
  <MuiBadge
    className={cx(
      BADGE.root,
      className,
      dotted && BADGE.dotted,
      number && BADGE.number
    )}
    classes={{
      badge: BADGE.badge
    }}
    {...props}
  >
    {children}
  </MuiBadge>
);

Badge.propTypes = {
  className: PropTypes.string,
  dotted: PropTypes.bool,
  number: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.object)
};

export default Badge;
