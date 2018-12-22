/**
 * Settings form
 */

/* eslint-disable */

import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useMappedState } from 'redux-react-hook';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import styles from './styles/settings';

const Settings = props => {
  const { classes, mode, close } = props;

  return (
    <div className={classes.root}>
      <Typography
        className={classes.headline}
        variant="headline"
        component="h2"
      >
        Settings
      </Typography>
      <Divider light />
      <div className={classes.filterItems}>
        <FormControl component="fieldset">
          <FormLabel component="legend">General</FormLabel>
          <FormGroup>
            <FormHelperText> Select manager</FormHelperText>
            <FormControlLabel
              control={
                <Select
                  inputProps={{
                    name: 'manager'
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="npm">npm</MenuItem>
                  <MenuItem value="yarn">yarn</MenuItem>
                </Select>
              }
              label="Manager"
            />
          </FormGroup>
        </FormControl>
        <Divider className={classes.bottomDivider} light />
        <div className={classes.actions}>
          <Button color="primary" onClick={close}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
