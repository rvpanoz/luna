/**
 * AppHeader Menu content
 */

import { remote, ipcRenderer } from 'electron'
import { withStyles } from 'material-ui/styles'
import { autoBind } from 'utils'
import React from 'react'
import PropTypes from 'prop-types'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import Divider from 'material-ui/Divider'
import Tooltip from 'material-ui/Tooltip'
import Avatar from 'material-ui/Avatar'
import deepOrange from 'material-ui/colors/deepOrange'
import deepPurple from 'material-ui/colors/deepPurple'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  directory: {
    width: 45,
    overflowWrap: 'break-word'
  },
  list: {
    display: 'block',
    position: 'relative',
    width: '100%'
  },
  listItem: {
    fontFamily: 'Roboto',
    marginLeft: 50
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      fill: 'rgb(225, 0, 80)',
      textDecoration: 'none'
    }
  },
  iconHover: {
    '&:hover': {
      fill: 'rgb(225, 0, 80)'
    }
  }
})

class AppHeaderContent extends React.Component {
  constructor() {
    super()
    autoBind(['analyzeDirectory', 'openPackage', 'toggleSettings'], this)
  }
  analyzeDirectory(e, directory) {
    const { handleDrawerClose } = this.props
    e.preventDefault()

    ipcRenderer.send('analyze-json', directory)
    handleDrawerClose()
  }
  openPackage(e) {
    e.preventDefault()
    const { handleDrawerClose } = this.props

    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        title: 'Open package.json file',
        buttonLabel: 'Analyze',
        filters: [
          {
            name: 'package.json',
            extensions: ['json']
          }
        ],
        properties: ['openFile']
      },
      (filePath) => {
        if (filePath) {
          const directory = filePath[0]
          ipcRenderer.send('analyze-json', directory)
        }
        handleDrawerClose()
      }
    )
  }
  toggleSettings(e) {
    const { handleSettingsOpen } = this.props
    handleSettingsOpen(true)
  }
  render() {
    const { classes, openedPackages } = this.props

    return (
      <div className={classes.root}>
        <List>
          <ListItem button onClick={this.openPackage}>
            <ListItemIcon>
              <Icon className={classes.iconHover}>archive</Icon>
            </ListItemIcon>
            <ListItemText primary="Analyze" secondary="local repository" />
          </ListItem>
          <ListItem button onClick={this.toggleSettings}>
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText primary="Settings" secondary="application settings" />
          </ListItem>
        </List>
        <Divider />
        <div className={classes.list}>
          <List dense={true}>
            <ListItem>
              <ListItemIcon>
                <Icon>folder_open</Icon>
              </ListItemIcon>
              <ListItemText primary="Packages history" />
            </ListItem>
            {openedPackages &&
              openedPackages.map((pkg, idx) => {
                const pkgToArray = pkg.split('/')
                const items = pkgToArray.length
                const pkgName = pkgToArray[items - 2]

                return (
                  <ListItem key={`opkg-${idx}`}>
                    <ListItemText
                      className={classes.listItem}
                      primary={
                        <a
                          onClick={(e) => this.analyzeDirectory(e, pkg)}
                          href="#sub-labels-and-columns"
                          className={classes.link}
                        >
                          {pkgName}
                        </a>
                      }
                    />
                  </ListItem>
                )
              })}
          </List>
        </div>
      </div>
    )
  }
}

const { object } = PropTypes

AppHeaderContent.propTypes = {
  classes: object.isRequired
}

export default withStyles(styles)(AppHeaderContent)
