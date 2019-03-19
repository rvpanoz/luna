/* eslint-disable react/require-default-props */

import { withStyles } from '@material-ui/core/styles';
import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { remove, prepend, merge } from 'ramda';
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
    ({ type, value }) => {
      const idx = filters.map(({ type }) => type).indexOf(type);

      const newFilters =
        idx > -1
          ? type !== 'name'
            ? remove(idx, 1, filters)
            : Object.assign([], filters, { [idx]: { type, value } })
          : prepend(
              {
                type,
                value
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
  console.log(filters && filters.map(f => f.value));
  return (
    <div className={classes.root}>
      <div className={classes.filterItems}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Package name</FormLabel>
          <FormGroup>
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
                      type: 'name',
                      value
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
            By group
          </FormLabel>
          <FormGroup
            className={cn(classes.flexContainer, {
              [classes.hidden]: mode === 'global'
            })}
          >
            <FormHelperText> Select packages based on group</FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    filters &&
                    filters.map(f => f.value).includes('dependencies')
                  }
                  onChange={() =>
                    addFilter({
                      type: 'group',
                      value: 'dependencies'
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
                    filters.map(f => f.value).includes('devDependencies')
                  }
                  onChange={() =>
                    addFilter({
                      type: 'group',
                      value: 'devDependencies'
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
                    filters.map(f => f.value).includes('optionalDependencies')
                  }
                  onChange={() =>
                    addFilter({
                      type: 'group',
                      value: 'optionalDependencies'
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
          <FormLabel component="legend">By status</FormLabel>
          <FormGroup>
            <FormHelperText> Select outdated packages</FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    filters && filters.map(f => f.type).includes('version')
                  }
                  onChange={() =>
                    addFilter({
                      type: 'version',
                      value: 'latest'
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
