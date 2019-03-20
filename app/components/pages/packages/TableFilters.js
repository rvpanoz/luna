/* eslint-disable react/require-default-props */

import { withStyles } from '@material-ui/core/styles';
import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { remove, prepend } from 'ramda';
import { useDispatch } from 'redux-react-hook';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { updateFilters } from 'models/packages/actions';
import AppButton from 'components/units/Buttons/AppButton';
import styles from './styles/tableFilters';

const TableFilters = ({ classes, mode, close }) => {
  const searchInputEl = useRef(null);
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const addFilter = useCallback(
    ({ filterType, filterValue }) => {
      const idx = filters
        .map(filterDetails => filterDetails.filterType)
        .indexOf(filterType);

      const newFilters =
        idx > -1
          ? filterType !== 'name'
            ? remove(idx, 1, filters)
            : Object.assign([], filters, { [idx]: { filterType, filterValue } })
          : prepend(
              {
                filterType,
                filterValue
              },
              filters
            );

      setFilters(newFilters);
    },
    [filters]
  );

  const handleFilters = useCallback(() => {
    if (filters.length) {
      dispatch(updateFilters({ allFilters: filters }));
    }

    close();
  });

  return (
    <div className={classes.root}>
      <div className={classes.filterItems}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Package name</FormLabel>
          <FormGroup>
            <FormHelperText>Fill package name</FormHelperText>
            <div className={classes.search}>
              <SearchIcon className={classes.searchIcon} />
              <InputBase
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{
                  ref: searchInputEl
                }}
                onChange={e => {
                  const { value } = e.currentTarget;

                  if (value && value.length) {
                    addFilter({
                      filterType: 'name',
                      filterValue: value
                    });
                  }
                }}
              />
            </div>
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            className={cn({
              [classes.hidden]: mode === 'global'
            })}
          >
            Group
          </FormLabel>
          <FormGroup
            className={cn(classes.flexContainer, {
              [classes.hidden]: mode === 'global'
            })}
          >
            <FormHelperText>Select packages based on group</FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    filters &&
                    filters
                      .map(({ filterType, filterValue }) => filterValue)
                      .includes('dependencies')
                  }
                  onChange={() =>
                    addFilter({
                      filterType: 'group',
                      filterValue: 'dependencies'
                    })
                  }
                  value="dependencies"
                />
              }
              label="Dependencies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    filters &&
                    filters
                      .map(({ filterType, filterValue }) => filterValue)
                      .includes('devDependencies')
                  }
                  onChange={() =>
                    addFilter({
                      filterType: 'group',
                      filterValue: 'devDependencies'
                    })
                  }
                  value="devDependencies"
                />
              }
              label="Dev dependencies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    filters &&
                    filters
                      .map(({ filterType, filterValue }) => filterValue)
                      .includes('optionalDependencies')
                  }
                  onChange={() =>
                    addFilter({
                      filterType: 'group',
                      filterValue: 'optionalDependencies'
                    })
                  }
                  value="optionalDependencies"
                />
              }
              label="Optional dependencies"
            />
          </FormGroup>
          <FormHelperText />
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Status</FormLabel>
          <FormGroup>
            <FormHelperText> Select outdated packages</FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    filters &&
                    filters
                      .map(({ filterType, filterValue }) => filterValue)
                      .includes('latest')
                  }
                  onChange={() =>
                    addFilter({
                      filterType: 'version',
                      filterValue: 'latest'
                    })
                  }
                  value="latest"
                />
              }
              label="Outdated"
            />
          </FormGroup>
        </FormControl>
        <Divider className={classes.bottomDivider} light />
        <div className={classes.actions}>
          <AppButton color="secondary" onClick={close}>
            Close
          </AppButton>
          <AppButton color="primary" onClick={handleFilters}>
            Filter
          </AppButton>
        </div>
      </div>
    </div>
  );
};

TableFilters.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string,
  close: PropTypes.func
};

export default withStyles(styles)(TableFilters);
