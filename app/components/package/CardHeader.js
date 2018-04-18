/**
 * CardHeader component
 */

import { shell } from 'electron'
import { withStyles } from 'material-ui/styles'
import { CardHeader as MuiCardHeader } from 'material-ui/Card'
import Menu, { MenuItem } from 'material-ui/Menu'
import { isUrl } from 'utils'
import React from 'react'
import PropTypes from 'prop-types'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import moment from 'moment'
import Typography from 'material-ui/Typography'

const grayColor = '#999999'
const { array, object, string, func } = PropTypes
const ITEM_HEIGHT = 55,
  ITEM_PADDING_TOP = 8,
  MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4,
        width: 150
      }
    }
  }

const styles = (theme) => {
  return {
    avatar: {
      backgroundColor: theme.palette.primary.light
    },
    typo: {
      fontSize: '14px',
      color: '#fff'
    },
    cardStats: {
      lineHeight: '22px',
      color: grayColor,
      fontSize: '12px',
      display: 'inline-block',
      margin: '0!important'
    },
    cardStatsIcon: {
      position: 'relative',
      top: '4px',
      marginRight: 5,
      width: '16px',
      height: '16px'
    }
  }
}

class CardHeader extends React.Component {
  constructor(props) {
    super(props)
    this._anchorEl = null
    this.buildSubHeader = this.buildSubHeader.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  buildSubHeader() {
    const { active, group, classes } = this.props

    return (
      <div className={classes.cardStats}>
        Updated&nbsp;{active.time && active.time.modified
          ? moment(active.time.modified).format('DD/MM/YYYY')
          : null}
      </div>
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
  render() {
    const { classes, active, mode, error } = this.props

    if (!active) {
      return null
    }

    return (
      <MuiCardHeader
        avatar={
          <Avatar aria-label={active.name} className={classes.avatar}>
            <Typography variant="title" className={classes.typo}>
              {active.name && active.name[0].toUpperCase()}
            </Typography>
          </Avatar>
        }
        action={
          <div style={{ marginLeft: 'auto' }}>
            <IconButton
              aria-label="More"
              aria-owns={this._anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={this._anchorEl}
              open={Boolean(this._anchorEl)}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              <MenuItem
                key="homepage"
                onClick={(e) => {
                  const url = active.homepage || false
                  if (isUrl(url)) {
                    shell.openExternal(url)
                  }
                  return false
                }}
              >
                Homepage
              </MenuItem>
              <MenuItem
                key="issues"
                onClick={(e) => {
                  const url = active.bugs && active.bugs.url
                  if (isUrl(url)) {
                    shell.openExternal(url)
                  }
                  return false
                }}
              >
                Issues
              </MenuItem>
            </Menu>
          </div>
        }
        title={`${active.name} \n${active.version}`}
        subheader={this.buildSubHeader()}
      />
    )
  }
}

CardHeader.propTypes = {
  classes: object.isRequired,
  mode: string.isRequired,
  active: object.isRequired
}

export default withStyles(styles)(CardHeader)
