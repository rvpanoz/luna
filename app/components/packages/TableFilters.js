/**
 * Table list filters
 */

/* eslint-disable */

import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useMappedState } from 'redux-react-hook';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FilterIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { APP_MODES } from '../../constants/AppConstants';

import { addFilter, clearFilters } from '../../models/packages/actions';

import { tableFiltersStyles as styles } from './styles';

const mapState = state => ({
  filters: state.packages.filters
});

const ListFilters = props => {
  const { classes, mode, close } = props;

  const dispatch = useDispatch();
  const { filters } = useMappedState(mapState);

  return (
    <div className={classes.root}>
      <Typography
        className={classes.headline}
        variant="headline"
        component="h2"
      >
        Filters
      </Typography>
      <Divider light />
      <div className={classes.filterItems}>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            style={{
              display: mode === APP_MODES.GLOBAL ? 'none' : 'block'
            }}
          >
            By group
          </FormLabel>
          <FormGroup
            style={{
              display: mode === APP_MODES.GLOBAL ? 'none' : 'block'
            }}
          >
            <FormHelperText> Select packages based on group</FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={mode === APP_MODES.GLOBAL}
                  checked={filters && filters.indexOf('dependencies') > -1}
                  onChange={() =>
                    dispatch(addFilter({ filterName: 'dependencies' }))
                  }
                  value="dependencies"
                />
              }
              label="Dependencies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={mode === APP_MODES.GLOBAL}
                  checked={filters && filters.indexOf('devDependencies') > -1}
                  onChange={() =>
                    dispatch(addFilter({ filterName: 'devDependencies' }))
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
                    filters && filters.indexOf('optionalDependencies') > -1
                  }
                  onChange={() =>
                    dispatch(addFilter({ filterName: 'optionalDependencies' }))
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
                  checked={filters && filters.indexOf('latest') > -1}
                  onChange={() => dispatch(addFilter({ filterName: 'latest' }))}
                  value="latest"
                />
              }
              label="Outdated"
            />
          </FormGroup>
        </FormControl>
        <Divider className={classes.bottomDivider} light />
        <div className={classes.actions}>
          <Button
            color="secondary"
            onClick={e => {
              if (filters && filters.length) {
                dispatch(clearFilters());
              }
              return false;
            }}
          >
            <FilterIcon className={classes.leftIcon} />
            Clear
          </Button>
          <Button color="primary" onClick={close}>
            <ClearIcon className={classes.leftIcon} />
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

ListFilters.propTypes = {
  classes: PropTypes.object.isRequired,
  filters: PropTypes.array
};

export default withStyles(styles)(ListFilters);
