/** Toolbar List component **/

import { withStyles } from 'material-ui/styles'
import { filter } from 'ramda'
import { lighten } from 'material-ui/styles/colorManipulator'
import { autoBind } from 'utils'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Toolbar from 'material-ui/Toolbar'
import Popover from 'material-ui/Popover'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'
import RefreshIcon from 'material-ui-icons/Refresh'
import ListIcon from 'material-ui-icons/List'
import FilterListIcon from 'material-ui-icons/FilterList'
import ListFilters from './ListFilters'

const styles = (theme) => {
  return {
    root: {
      width: '100%'
    },
    tableListToolbar: {
      paddingRight: theme.spacing.unit
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    spacer: {
      flex: '1 1 100%'
    },
    actions: {
      color: theme.palette.text.secondary
    },
    header: {
      flex: '0 0 auto'
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      '& > h1': {
        fontSize: 18
      }
    },
    directory: {
      fontSize: 12
    }
  }
}

class TableListToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
    autoBind(['_applyFilters', 'handleFilters', 'handleFiltersClose'], this)
  }
  _applyFilters(e) {
    const {
      applyFilters
    } = this.props

    applyFilters(e)
    this.handleFiltersClose()
  }
  handleFiltersClose(e) {
    const { showFilters, toggleFilters } = this.props

    this.setState(
      {
        anchorEl: null
      },
      () => {
        toggleFilters(!showFilters)
      }
    )
  }
  handleFilters(e) {
    const { showFilters, toggleFilters } = this.props

    this.setState(
      {
        anchorEl: e.target
      },
      () => {
        toggleFilters(!showFilters)
      }
    )
  }
  render() {
    const {
      classes,
      directory,
      selected,
      mode,
      title,
      loading,
      handleReload,
      handleGlobals,
      handleUninstall,
      handleInstall,
      handleUpdate,
      rowCount,
      showFilters,
      addFilter,
      filters,
      packagesActions
    } = this.props

    const { anchorEl } = this.state

    //search mode catch
    const searchMode = filter((action) => action.text === 'Install')(
      packagesActions
    ).length

    return (
      <section className={classes.root}>
        <Toolbar
          className={classNames(classes.tableListToolbar, {
            [classes.highlight]: selected && selected.length > 0
          })}
        >
          <div className={classes.header}>
            {selected && selected.length > 0 ? (
              <Typography
                color="primary"
                variant="headline"
                className={classes.headline}
              >
                {selected.length} selected
              </Typography>
            ) : (
              <div className={classes.title}>
                <Typography color="primary" component="h1">
                  {title} {rowCount || 0}
                </Typography>
                {directory ? (
                  <Typography
                    className={classes.directory}
                    variant="headline"
                    color="secondary"
                    component="div"
                  >
                    {' '}
                    {directory}{' '}
                  </Typography>
                ) : null}
              </div>
            )}
          </div>
          <div className={classes.filters}>
            <Popover
              open={showFilters}
              anchorEl={anchorEl}
              onClose={this.handleFiltersClose}
            >
              <ListFilters
                mode={mode}
                onAddFilter={addFilter}
                filters={filters}
                applyFilters={this._applyFilters}
              />
            </Popover>
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            {searchMode && selected.length ? (
              <Tooltip title="Install selected">
                <IconButton
                  aria-label="Install-selected"
                  onClick={handleInstall}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            ) : !searchMode && selected.length ? (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Tooltip title="Uninstall selected">
                  <IconButton
                    aria-label="Uninstall-selected"
                    onClick={handleUninstall}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Tooltip title="Reload list">
                  <IconButton aria-label="Reload list" onClick={handleReload}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Show globals">
                  <IconButton aria-label="Show globals" onClick={handleGlobals}>
                    <ListIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Show filters">
                  <IconButton
                    aria-label="Show filters"
                    onClick={this.handleFilters}
                  >
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        </Toolbar>
      </section>
    )
  }
}

TableListToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array
}

export default withStyles(styles)(TableListToolbar)
