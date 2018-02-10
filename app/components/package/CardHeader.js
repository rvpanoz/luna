import { CardHeader as MuiCardHeader } from 'material-ui/Card'
import React from 'react'
import PropTypes from 'prop-types'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'

const { object } = PropTypes

class CardHeader extends React.Component {
  constructor() {
    super()
    this._anchorEl = null
    this.buildTitle = this.buildTitle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  buildTitle() {
    const { active, group, actions } = this.props
    const { name, author, version } = active
    return group ? `${name} - ${group}` : `${name} - v${version}`
  }
  handleClick(e) {
    this._anchorEl = e.currentTarget
    this.forceUpdate()
  }
  handleClose() {
    this._anchorEl = null
    this.forceUpdate()
  }
  render() {
    const ITEM_HEIGHT = 55
    const anchorEl = this._anchorEl
    const { classes, active, actions } = this.props

    if (!active) {
      return null
    }

    return (
      <MuiCardHeader
        avatar={
          <Avatar aria-label={active.name} className={classes.avatar}>
            {active.name[0].toUpperCase()}
          </Avatar>
        }
        action={
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
              <MenuItem key="show-globals" onClick={this.setGlobalMode}>
                Show globals
              </MenuItem>
            </Menu>
          </div>
        }
        title={this.buildTitle()}
        subheader={active.version}
      />
    )
  }
}

// <Menu
//   id="long-menu"
//   anchorEl={this._anchorEl}
//   open={Boolean(this._anchorEl)}
//   onClose={this.handleClose}
//   PaperProps={{
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5,
//       width: 200
//     }
//   }}
// />
// {actions.map((action, key) => (
//   <MenuItem
//     key={key}
//     selected={action.text === 'save'}
//     onClick={this.handleClose}
//   >
//     {action.text}
//   </MenuItem>
// ))}

CardHeader.propTypes = {
  classes: object,
  active: object
}

export default CardHeader
