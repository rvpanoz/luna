/** Toolbar List component **/

import { withStyles } from 'material-ui/styles'
import { filter } from 'ramda'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'
import RefreshIcon from 'material-ui-icons/Refresh'
import ListIcon from 'material-ui-icons/List'
import FilterListIcon from 'material-ui-icons/FilterList'
import UpdateIcon from 'material-ui-icons/Update'
import Divider from 'material-ui/Divider'
import { lighten } from 'material-ui/styles/colorManipulator'

const styles = (theme) => {
  return {
    root: {
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
    title: {
      flex: '0 0 auto'
    }
  }
}

const TableListToolbar = (props) => {
  const {
    classes,
    directory,
    selected,
    title,
    loading,
    handleReload,
    handleGlobals,
    handleUninstall,
    handleInstall,
    handleUpdate,
    rowCount,
    packagesActions
  } = props

  const searchMode = filter((action) => action.text === 'Install')(
    packagesActions
  ).length

  return (
        <Toolbar className={classNames(classes.root, {[classes.highlight]: selected && selected.length > 0})}>
          <div className={classes.title}>
            {selected && selected.length > 0 ? (
              <Typography color="inherit" variant="subheading">
                {selected.length} selected
              </Typography>
            ) : (
              <Typography variant="title">
                {title} {rowCount} <br /> {directory || null}
              </Typography>
            )}
          </div>
          <div className={classes.spacer} />
          {loading ? null : (
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
                  <Tooltip title="Update all">
                    <IconButton aria-label="Update-all" onClick={handleUpdate}>
                      <UpdateIcon />
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
                    <IconButton
                      aria-label="Show globals"
                      onClick={handleGlobals}
                    >
                      <ListIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>)}
        </Toolbar>
  )
}

TableListToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array
}

export default withStyles(styles)(TableListToolbar)
