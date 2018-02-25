/**
 * ListHeader
 *
 */

import { ipcRenderer } from 'electron'
import { withStyles } from 'material-ui/styles'
import { packagesListStyles } from 'styles/components'
import { autoBind } from 'utils'
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'

const ITEM_HEIGHT = 48

class ListHeader extends React.Component {
  constructor() {
    super()
    this._anchorEl = null
    autoBind(
      [
        'handleClick',
        'handleClose',
        'handleSortByLatest',
        'handleSortByName',
        '_reload',
        '_setGlobalMode'
      ],
      this
    )
  }
  handleClick(e) {
    this._anchorEl = e.currentTarget
    this.forceUpdate()
  }
  handleClose() {
    this._anchorEl = null
    this.forceUpdate()
  }
  handleSortByName() {
    const { sortBy } = this.props
    sortBy('from')
    this.handleClose()
  }
  handleSortByLatest() {
    const { sortBy } = this.props
    sortBy('latest')
    this.handleClose()
  }
  _setGlobalMode(e) {
    const { setGlobalMode } = this.props
    setGlobalMode()
    this.handleClose()
  }
  _reload(e) {
    const { reload } = this.props
    reload()
    this.handleClose()
  }

  render() {
    const { classes, total, mode, directory, title } = this.props
    const anchorEl = this._anchorEl

    return (
      <section className={classes.flexColumn}>
        <div className={classes.flexRow}>
          <h3 className={classes.heading}>{title}</h3>
          <Avatar className={classes.avatar} color="accent">
            {total || 0}
          </Avatar>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.iconbutton}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              <MenuItem key="sort-name" onClick={this.handleSortByName}>
                Sort by name
              </MenuItem>
              <MenuItem key="sort-latest" onClick={this.handleSortByLatest}>
                Sort by outdated
              </MenuItem>
              <Divider />
              <MenuItem key="reload" onClick={this._reload}>
                Reload
              </MenuItem>
              <MenuItem key="global" onClick={this._setGlobalMode}>
                Show global packages
              </MenuItem>
            </Menu>
          </div>
          <Divider />
        </div>
        <div className={classes.flexRow}>
          <Typography align="left" paragraph className={classes.directory}>
            {directory}
          </Typography>
        </div>
        <Divider />
      </section>
    )
  }
}

const { object, number, string } = PropTypes

ListHeader.propTypes = {
  classes: object.isRequired,
  mode: string.isRequired,
  total: number,
  directory: string,
  title: string
}

export default withStyles(packagesListStyles)(ListHeader)
