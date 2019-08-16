/* eslint-disable compat/compat */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { PACKAGE_GROUPS } from 'constants/AppConstants';
import styles from './styles/controlTypes';

const groups = Object.values(PACKAGE_GROUPS);

const ControlTypes = ({ classes, packageName, onSelect }) => {
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
              name: packageName,
              options: [value]
            });
          }}
        >
          {groups.map(group =>
            group !== 'save-exact' ? (
              <MenuItem key={`group${group}`} value={group}>
                {group}
              </MenuItem>
            ) : null
          )}
        </Select>
      </FormControl>
      <FormControlLabel
        className={classes.formControl}
        control={
          <Checkbox
            onChange={() =>
              onSelect({
                name: packageName,
                options: ['save-exact']
              })
            }
            value="save-exact"
          />
        }
        label="exact"
      />
    </FormGroup>
  );
};

ControlTypes.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  packageName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default withStyles(styles)(ControlTypes);
