import { withStyles } from 'material-ui/styles'
import { toolbarStyles } from './styles'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import DeleteIcon from 'material-ui-icons/Delete'
import FilterListIcon from 'material-ui-icons/FilterList'

class TableListToolbar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes, selected, title } = this.props

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: selected.length > 0
        })}
      >
        <div className={classes.title}>
          {selected.length > 0 ? (
            <Typography color="inherit" variant="subheading">
              {selected.length} selected
            </Typography>
          ) : (
            <Typography variant="title">{title}</Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {selected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    )
  }
}

TableListToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired
}

export default withStyles(toolbarStyles)(TableListToolbar)
