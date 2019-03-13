/* eslint-disable compat/compat */
/* eslint-disable react/require-default-props */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';

import { PACKAGE_GROUPS } from 'constants/AppConstants';
import styles from './styles/controlTypes';

const groups = Object.values(PACKAGE_GROUPS);

const ControlTypes = ({
  classes,
  packageName,
  onSelect,
  selectedValue,
  single
}) => {
  const [groupName, setGroup] = useState(selectedValue || 'save-prod');
  const data = single ? ['save-dev'] : groups;

  return (
    <FormGroup row>
      <FormControl className={classes.formControl}>
        <Select
          value={groupName}
          onChange={e => {
            const { value } = e.target;

            setGroup(value);
            onSelect({
              name: packageName,
              options: [value]
            });
          }}
        >
          {data.map(group => (
            <MenuItem key={`group${group}`} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormGroup>
  );
};

ControlTypes.defaultProps = {
  single: false
};

ControlTypes.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  packageName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
  single: PropTypes.bool
};

export default withStyles(styles)(ControlTypes);
