/* eslint-disable compat/compat */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import styles from './styles/flags';

const ControlTypes = ({ classes }) => (
  <div className={classes.flexContainer}>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox checked={true} onChange={() => {}} value="save-exact" />
        }
        label="exact"
      />
    </FormGroup>
  </div>
);

ControlTypes.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(ControlTypes);
