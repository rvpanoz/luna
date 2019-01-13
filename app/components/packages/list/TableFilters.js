/* eslint-disable */

/**
 * Table list filters
 */

import { withStyles } from '@material-ui/core/styles';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useMappedState } from 'redux-react-hook';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { APP_MODES } from 'constants/AppConstants';

import AppButton from 'components/layout/Buttons/AppButton';
import { onAddFilter, onClearFilters } from 'models/packages/selectors';

import { tableFiltersStyles as styles } from './styles/packagesStyles';

const mapState = state => ({
  filters: state.packages.filters
});

const ListFilters = ({ classes, mode, close }) => {
  const dispatch = useDispatch();
  const { filters } = useMappedState(mapState);
  const clearFilters = () =>
    filters && filters.length ? onClearFilters(dispatch) : false;

  return (
    <div className={classes.root}>
      <Typography className={classes.headline} component="h2">
        Filter packages
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
                    onAddFilter(dispatch, {
                      filter: 'dependencies'
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
                  disabled={mode === APP_MODES.GLOBAL}
                  checked={filters && filters.indexOf('devDependencies') > -1}
                  onChange={() =>
                    onAddFilter(dispatch, {
                      filter: 'devDependencies'
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
                    filters && filters.indexOf('optionalDependencies') > -1
                  }
                  onChange={() =>
                    onAddFilter(dispatch, {
                      filter: 'optionalDependencies'
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
                  checked={filters && filters.indexOf('latest') > -1}
                  onChange={() =>
                    onAddFilter(dispatch, {
                      filter: 'latest'
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
          <AppButton onClick={clearFilters}>Clear</AppButton>
          <AppButton onClick={close}>Close</AppButton>
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
