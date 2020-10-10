import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { iMessage } from 'commons/utils';
import styles from './styles/settings';

const Settings = ({ classes, ...restProps }) => {
  const { onChangeRowsPage, rowsPerPage } = restProps;

  return (
    <div className={classes.root}>
      <List>
        <ListItem key="rows-per-page">
          <ListItemText primary={<Typography>Rows per page</Typography>} />
          <ListItemSecondaryAction>
            <FormControl className={classes.formControl}>
              <InputLabel id="rowsPerPage-label">Rows per page</InputLabel>
              <Select
                labelId="rowsPerPage-label"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={(e) => onChangeRowsPage(e.target.value)}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={999}>All</MenuItem>
              </Select>
            </FormControl>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
};

Settings.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onChangeRowsPage: PropTypes.func.isRequired,
};

export default withStyles(styles)(Settings);
