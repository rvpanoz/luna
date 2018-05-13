/**
ListFilters
**/

import { APP_MODES } from 'constants/AppConstants'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import FilterIcon from 'material-ui-icons/FilterList'
import ClearIcon from 'material-ui-icons/Clear'
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

const styles = (theme) => ({
  root: {
    maxWidth: 400,
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    '& > h2': {
      color: theme.palette.secondary.light,
      fontSize: 18
    }
  },
  filterItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bottomDivider: {
    margin: theme.spacing.unit
  },
  headline: {
    marginBottom: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit / 2
  }
})

const ListFilters = (props) => {
  const {
    classes,
    filters,
    onAddFilter,
    applyFilters,
    mode,
    clearFilters,
    handleFiltersClose
  } = props

  return (
    <div className={classes.root}>
      <Typography
        className={classes.headline}
        variant="headline"
        component="h2"
      >
        Filters
      </Typography>
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
                  onChange={(e) => onAddFilter('dependencies')}
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
                  onChange={(e) => onAddFilter('devDependencies')}
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
                  onChange={(e) => onAddFilter('optionalDependencies')}
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
                  onChange={(e) => onAddFilter('latest')}
                  value="latest"
                />
              }
              label="Outdated"
            />
          </FormGroup>
        </FormControl>
        <Divider className={classes.bottomDivider} light={true} />
        <div className={classes.actions}>
          <Button
            color="secondary"
            onClick={(e) => {
              if (filters && filters.length) {
                clearFilters()
              }
              return false
            }}
          >
            <FilterIcon className={classes.leftIcon} />
            Clear
          </Button>
          <Button color="primary" onClick={handleFiltersClose}>
            <ClearIcon className={classes.leftIcon} />
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

ListFilters.propTypes = {
  classes: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired
}

export default withStyles(styles)(ListFilters)
