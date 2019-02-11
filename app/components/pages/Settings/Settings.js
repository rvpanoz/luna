/**
 * Settings form
 */

/* eslint-disable */

import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useMappedState } from 'redux-react-hook';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import { setManager, setPageRows } from 'models/ui/actions';

import styles from './styles';

const mapState = state => ({
  manager: state.common.manager,
  rowsPerPage: state.common.rowsPerPage
});

const Settings = props => {
  const { classes, onClose } = props;
  const { manager, rowsPerPage } = useMappedState(mapState);

  const [setting_manager, setSettingManager] = useState(manager);
  const [setting_rowsPerPage, setSettingRowsPerPage] = useState(rowsPerPage);
  const dispatch = useDispatch();

  const saveSettings = () => {
    dispatch(setManager({ manager: setting_manager }));
    dispatch(setPageRows({ rowsPerPage: setting_rowsPerPage }));
    onClose();
  };

  return (
    <Paper className={classes.root} elevation={2}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>General</DialogContentText>
        <Divider light />
        <form className={classes.form} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="manager">Manager</InputLabel>
            <Select
              value={setting_manager}
              inputProps={{
                name: 'manager'
              }}
              onChange={(e, element) => setSettingManager(element.props.value)}
            >
              <MenuItem value={'npm'}>npm</MenuItem>
              <MenuItem value={'yarn'}>yarn</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.grow} />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="rowsPerPage">Rows per page</InputLabel>
            <Select
              value={setting_rowsPerPage}
              inputProps={{
                name: 'rowsPerPage'
              }}
              onChange={(e, element) =>
                setSettingRowsPerPage(Number(element.props.value))
              }
            >
              <MenuItem value={'5'}>5</MenuItem>
              <MenuItem value={'10'}>10</MenuItem>
              <MenuItem value={'15'}>15</MenuItem>
              <MenuItem value={'20'}>20</MenuItem>
              <MenuItem value={'50'}>50</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button
          onClick={e => saveSettings()}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Paper>
  );
};

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
