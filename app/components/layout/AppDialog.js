/* eslint-disable */

/**
 * App dialog
 */

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

import styles from './styles/dialogStyles';

const AppDialog = ({ open, title, classes, contentText, onClose }) => {
  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="app-dialog-title"
      onEntering={() => console.log('on enter')}
    >
      <DialogTitle id="app-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="max-width">maxWidth</InputLabel>
            <Select
              value={''}
              onChange={(e, value) => console.log(e, value)}
              inputProps={{
                name: 'version',
                id: 'version'
              }}
            >
              <MenuItem value={false}>false</MenuItem>
              <MenuItem value="xs">xs</MenuItem>
              <MenuItem value="sm">sm</MenuItem>
              <MenuItem value="md">md</MenuItem>
              <MenuItem value="lg">lg</MenuItem>
              <MenuItem value="xl">xl</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Switch
                checked={false}
                onChange={(e, value) => console.log(e, value)}
                value="latest"
              />
            }
            label="Install latest"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Install
        </Button>
        <Button onClick={handleInstall} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(AppDialog);
