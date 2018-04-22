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
    padding: theme.spacing.unit + 15,
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
  const { classes } = props

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
                  checked={true}
                  onChange={(e) => console.log(e)}
                  value="dependencies"
                />
              }
              label="Dependencies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  onChange={(e) => console.log(e)}
                  value="devDependencies"
                />
              }
              label="Dev dependencies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  onChange={(e) => console.log(e)}
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

export default withStyles(styles)(ListFilters)
