/* eslint-disable compat/compat */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';

import { PACKAGE_GROUPS } from 'constants/AppConstants';
import styles from './styles/types';

const groups = Object.values(PACKAGE_GROUPS);

const ControlTypes = ({ classes }) => (
  <FormGroup row>
    <FormControl className={classes.formControl}>
      <Select value="save-prod" onChange={() => {}}>
        {groups.map(group => {
          return (
            <MenuItem key={`group${group}`} value={group}>
              {group}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  </FormGroup>
);

ControlTypes.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(ControlTypes);
