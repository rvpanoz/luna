/* eslint-disable compat/compat */
/* eslint-disable react/require-default-props */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const ControlTypes = ({ classes, packageName, onSelect, devOnly }) => {
  const [groupName, setGroup] = useState('save-prod');

  const handleExact = e => {
    const { value } = e.currentTarget;

    onSelect({
      name: packageName,
      options: ['save-exact']
    });
  };

  useEffect(() => {
    if (devOnly) {
      setGroup('save-dev');
      onSelect({
        name: packageName,
        options: [groupName]
      });
    }
  }, []);

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
          {!devOnly || devOnly === false ? (
            groups.map(group =>
              group !== 'save-exact' ? (
                <MenuItem key={`group${group}`} value={group}>
                  {group}
                </MenuItem>
              ) : null
            )
          ) : (
            <MenuItem key="group-save-dev" value="save-dev">
              save-dev
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControlLabel
        className={classes.formControl}
        control={<Checkbox onChange={e => handleExact(e)} value="save-exact" />}
        label="exact"
      />
    </FormGroup>
  );
};

ControlTypes.defaultProps = {
  devOnly: false
};

ControlTypes.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  packageName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  devOnly: PropTypes.bool
};

export default withStyles(styles)(ControlTypes);
