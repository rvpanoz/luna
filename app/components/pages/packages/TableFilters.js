/* eslint-disable react/require-default-props */
/* eslint-disable  no-case-declarations */

import { withStyles } from '@material-ui/core/styles';
import React, { useRef, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { remove, prepend } from 'ramda';
import { useDispatch } from 'redux-react-hook';

import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/ClearAll';

import { updateFilters } from 'models/ui/actions';
import styles from './styles/tableFilters';

const TableFilters = ({
  classes,
  mode,
  close,
  clearAllFilters,
  listFilters
}) => {
  const searchInputEl = useRef(null);
  const [filters, setFilters] = useState([{ filterType: 'name' }]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (listFilters.length) {
      const inputName = searchInputEl && searchInputEl.current;
      const filter =
        listFilters &&
        listFilters.find(({ filterType }) => filterType === 'name');
      if (inputName && filter) {
        const { filterValue } = filter || {};

        inputName.value = filterValue || '';
      }

      setFilters(listFilters);
    }
  }, [listFilters]);

  const addFilter = useCallback(
    ({ filterType, filterValue }) => {
      const idx = filters
        .map(filterDetails => filterDetails.filterValue)
        .indexOf(filterValue);

      switch (true) {
        case idx > -1 && filterType !== 'name':
          setFilters(remove(idx, 1, filters));
          break;
        case filterType === 'name':
          const newFilters = filters.map(filterDetails => {
            if (filterDetails.filterType === 'name') {
              return { filterType, filterValue };
            }

            return filterDetails;
          });

          setFilters(newFilters);
          break;
        default:
          setFilters(
            prepend(
              {
                filterType,
                filterValue
              },
              filters
            )
          );
      }
    },
    [filters]
  );

  const handleFilters = allFilters => {
    const hasFilters =
      allFilters.length === 1
        ? allFilters.every(({ filterValue }) => filterValue !== undefined)
        : true;

    if (hasFilters) {
      dispatch(updateFilters({ allFilters }));
    }

    close();
  };

  const activeFilters = filters.map(({ filterValue }) => filterValue);

  return (
    <div className={classes.root}>
      <div className={classes.filterItems}>
        <div className={classes.flexContainer}>
          <div style={{ flex: 1 }}>
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
          </div>
          <Toolbar
            disableGutters
            classes={{
              root: classes.toolbar
            }}
          >
            <Tooltip title="Clear all">
              <div>
                <IconButton
                  disableRipple
                  color="secondary"
                  onClick={() => {
                    clearAllFilters();
                    close();
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </div>
            </Tooltip>
          </Toolbar>
        </div>

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
                  checked={activeFilters.indexOf('dependencies') > -1}
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
                  checked={activeFilters.indexOf('devDependencies') > -1}
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
                  checked={activeFilters.indexOf('optionalDependencies') > -1}
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
                  checked={activeFilters.indexOf('isOutdated') > -1}
                  onChange={() =>
                    addFilter({
                      filterType: 'version',
                      filterValue: 'isOutdated'
                    })
                  }
                  value="isOutdated"
                />
              }
              label="Outdated"
            />
          </FormGroup>
        </FormControl>
        <Divider className={classes.bottomDivider} light />
        <div className={classes.actions}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleFilters(filters)}
          >
            Filter
          </Button>
          <Button onClick={close}>Close</Button>
        </div>
      </div>
    </div>
  );
};

TableFilters.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  close: PropTypes.func.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
  mode: PropTypes.string,
  listFilters: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(TableFilters);
