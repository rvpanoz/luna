/**
ListFilters
**/

import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
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
  }
})

const ListFilters = (props) => {
  const { classes, filters, onAddFilter } = props

  return (
    <div className={classes.root}>
      <Typography variant="headline" component="h2">
        Filters
      </Typography>
      <Divider />
      <div className={classes.filterItems}>
        <TextField label="package name" />
        <FormControl
          component="fieldset"
          style={{
            marginTop: 20
          }}
        >
          <FormLabel component="legend">By group</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  onChange={(e) => console.log(e)}
                  value="outdated"
                />
              }
              label="Outdated"
            />
          </FormGroup>
          <FormHelperText />
        </FormControl>
      </div>
    </div>
  )
}

ListFilters.propTypes = {
  classes: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired
}

export default withStyles(styles)(ListFilters)
