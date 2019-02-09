/* eslint-disable react/require-default-props */

import { withStyles } from '@material-ui/core/styles';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useMappedState } from 'redux-react-hook';
import cn from 'classnames';

import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import { APP_MODES } from 'constants/AppConstants';
import AppButton from 'components/atoms/Buttons/AppButton';
import { addFilter, clearFilters } from 'models/packages/actions';

import { tableFiltersStyles as styles } from './styles/packagesStyles';

const mapState = state => ({
  filters: state.packages.filters
});

const ListFilters = ({ classes, mode, close }) => {
  const dispatch = useDispatch();
  const { filters } = useMappedState(mapState);

  const emptyFilters = useCallback(
    () => (filters && filters.length ? dispatch(clearFilters()) : false),
    [filters]
  );

  return (
    <div className={classes.root}>
      <div className={classes.filterItems}>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            className={cn({
              [classes.hidden]: mode === APP_MODES.GLOBAL
            })}
          >
            By group
          </FormLabel>
          <FormGroup
            className={cn(classes.flexContainer, {
              [classes.hidden]: mode === APP_MODES.GLOBAL
            })}
          >
            <FormHelperText> Select packages based on group</FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters && filters.includes('dependencies')}
                  onChange={() =>
                    dispatch(
                      addFilter({
                        filter: 'dependencies'
                      })
                    )
                  }
                  value="dependencies"
                />
              }
              label="Dependencies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters && filters.includes('devDependencies')}
                  onChange={() =>
                    dispatch(
                      addFilter({
                        filter: 'devDependencies'
                      })
                    )
                  }
                  value="devDependencies"
                />
              }
              label="Dev dependencies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters && filters.includes('optionalDependencies')}
                  onChange={() =>
                    dispatch(
                      addFilter({
                        filter: 'optionalDependencies'
                      })
                    )
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
                  checked={filters && filters.includes('latest')}
                  onChange={() =>
                    dispatch(
                      addFilter({
                        filter: 'latest'
                      })
                    )
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
          <AppButton
            className={classes.actionButton}
            color="danger"
            onClick={emptyFilters}
          >
            Clear
          </AppButton>
          <AppButton onClick={close}>Close</AppButton>
        </div>
      </div>
    </div>
  );
};

ListFilters.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  mode: PropTypes.string,
  close: PropTypes.func
};

export default withStyles(styles)(ListFilters);
