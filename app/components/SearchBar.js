/* eslint-disable */

import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%'
  },
  textField: {
    margin: 0,
    width: 200
  },
  dense: {
    position: 'relative',
    marginTop: 10,
    left: '50%'
  }
});

const SearchBar = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <FormControl className={classes.dense}>
        <Input
          inputProps={{
            style: {
              color: '#fff'
            }
          }}
          id="search-field"
          placeholder="search npm"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon color="secondary" />
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(SearchBar);