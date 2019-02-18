/* eslint-disable compat/compat */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';

import { PACKAGE_GROUPS } from 'constants/AppConstants';
import styles from './styles/categories';

const groups = Object.values(PACKAGE_GROUPS);

const CategoriesChips = ({ classes, onSelect, options }) => (
  <div className={classes.root}>
    {groups.map(group => {
      const icon =
        options && options.indexOf(group) > -1 ? <CheckIcon /> : null;

      return (
        <Chip
          key={group}
          icon={icon}
          label={group}
          onClick={e => {
            e.stopPropagation();
            onSelect([group]);
          }}
          className={classes.chip}
          variant={icon ? 'default' : 'outlined'}
          color={icon ? 'secondary' : 'primary'}
        />
      );
    })}
  </div>
);

CategoriesChips.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(CategoriesChips);
