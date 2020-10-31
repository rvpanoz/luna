import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRef, useCallback, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { iMessage } from 'commons/utils';
import { updateFilters, setPage } from 'models/ui/actions';

import styles from './styles';

const Filters = ({ classes, mode, close, listFilters }) => {
  const searchInputEl = useRef(null);
  const [filters, setFilters] = useState([{ filterType: 'name' }]);
  const dispatch = useDispatch();

  useEffect(() => {
    searchInputEl.current.focus();

    if (listFilters.length) {
      const inputName = searchInputEl && searchInputEl.current;
      const filter = listFilters.find(
        ({ filterType }) => filterType === 'name'
      );

      if (inputName && filter) {
        const { filterValue } = filter || {};

        inputName.value = filterValue || ''; // hack: update name filter
      }

      setFilters(listFilters);
    }
  }, [listFilters]);

  const addFilter = useCallback(
    ({ filterType, filterValue }) => {
      const idx = filters
        .map((filterDetails) => filterDetails.filterValue)
        .indexOf(filterValue);

      switch (true) {
        case idx > -1 && filterType !== 'name':
          setFilters(remove(idx, 1, filters));
          break;
        case filterType === 'name':
          const newFilters = filters.map(({ filterType, filterValue }) => {
            if (filterType === 'name') {
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
                filterValue,
              },
              filters
            )
          );
      }
    },
    [filters]
  );

  const handleFilters = (allFilters) => {
    const hasFilters =
      allFilters.length === 1
        ? allFilters.every(({ filterValue }) => filterValue !== undefined)
        : true;

    if (hasFilters) {
      dispatch(updateFilters({ allFilters }));
      dispatch(setPage({ page: 0 }));
    }

    close();
  };

  const activeFilters = filters.map(({ filterValue }) => filterValue);

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormGroup>
          <FormHelperText>
            {iMessage('label', 'packageNameInput')}
          </FormHelperText>
          <div className={classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{
                ref: searchInputEl,
              }}
              onChange={(e) => {
                const { value } = e.currentTarget;

                if (value && value.length) {
                  addFilter({
                    filterType: 'name',
                    filterValue: value,
                  });
                }
              }}
            />
          </div>
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormGroup
          className={cn(classes.flex, {
            [classes.hidden]: mode === 'global',
          })}
        >
          <FormHelperText>{iMessage('label', 'groupType')}</FormHelperText>
          <FormControlLabel
            className={classes.controlLabel}
            control={
              <Checkbox
                checked={activeFilters.indexOf('dependencies') > -1}
                onChange={() =>
                  addFilter({
                    filterType: 'group',
                    filterValue: 'dependencies',
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
                    filterValue: 'devDependencies',
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
                    filterValue: 'optionalDependencies',
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
        <FormGroup>
          <FormHelperText>{iMessage('label', 'byOutdated')}</FormHelperText>
          <FormControlLabel
            control={
              <Checkbox
                checked={activeFilters.indexOf('isOutdated') > -1}
                onChange={() =>
                  addFilter({
                    filterType: 'version',
                    filterValue: 'isOutdated',
                  })
                }
                value="isOutdated"
              />
            }
            label="Outdated"
          />
        </FormGroup>
      </FormControl>
      <Divider className={classes.bottomDivider} />
      <div className={classes.actions}>
        <Button color="secondary" variant="outlined" onClick={close}>
          {iMessage('action', 'close')}
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => handleFilters(filters)}
        >
          {iMessage('action', 'filter')}
        </Button>
      </div>
    </div>
  );
};

Filters.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  close: PropTypes.func.isRequired,
  mode: PropTypes.string,
  listFilters: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles)(Filters);
