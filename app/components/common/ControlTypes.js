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
import styles from './styles/types';

const groups = Object.values(PACKAGE_GROUPS);

const ControlTypes = ({ classes, name, onSelect }) => {
  const [groupName, setGroup] = useState('save-prod');

  return (
    <FormGroup row>
      <FormControl className={classes.formControl}>
        <Select
          value={groupName}
          onChange={e => {
            const { value } = e.target;

            setGroup(value);
            onSelect({
              name,
              options: [value]
            });
          }}
        >
          {groups.map(group => (
            <MenuItem key={`group${group}`} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormGroup>
  );
};

ControlTypes.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default withStyles(styles)(ControlTypes);
