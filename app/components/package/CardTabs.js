/**
 * Card tabs component
 **/

import { withStyles } from 'material-ui/styles'
import { autoBind, objectEntries, triggerEvent } from 'utils'
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Tooltip from 'material-ui/Tooltip'
import TimeGraph from 'common/TimeGraph'
import classnames from 'classnames'
import {
  Timeline as TimelineIcon,
  Code as CodeIcon,
  Build as BuildIcon,
  Group as GroupIcon
} from 'material-ui-icons'

const styles = (theme) => {
  return {
    root: {
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit + 25,
      backgroundColor: theme.palette.white,
      height: 500
    },
    graphContent: {
      padding: theme.spacing.unit * 1.5
    },
    list: {
      visibility: 'visible',
      overflowX: 'hidden',
      overflowY: 'scroll',
      clear: 'both',
      maxHeight: '750px'
    },
    innerListSmall: {
      maxHeight: '400px'
    },
    heading: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '1.1rem',
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
  }
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 6 * 3 }}>
      {props.children}
    </Typography>
  )
}

class CardTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    }
    autoBind(['buildList', 'handleChange', 'viewPackage'], this)
  }
  buildList(data, onlyValues) {
    const { classes } = this.props

    try {
      const dataArr = data && objectEntries(data)

      if (!dataArr || !dataArr.length) {
        return 'No data'
      }

      return (
        <div className={classnames(classes.list, classes.innerListSmall)}>
          <List dense={true}>
            {dataArr &&
              dataArr.map((item, idx) => {
                const itemName = item[0]
                const itemValue = item[1]

                return (
                  <ListItem
                    button={!onlyValues}
                    key={`itemk-${idx}`}
                    onClick={(e) => {
                      if (!onlyValues) {
                        this.viewPackage(e, itemName, itemValue)
                      }
                      return false
                    }}
                  >
                    {onlyValues ? (
                      <ListItemText primary={itemValue} />
                    ) : (
                      <Tooltip
                        enterDelay={300}
                        leaveDelay={300}
                        placement="left"
                        title="Preview the selected package"
                      >
                        <ListItemText
                          primary={itemName}
                          secondary={itemValue}
                        />
                      </Tooltip>
                    )}
                  </ListItem>
                )
              })}
          </List>
        </div>
      )
    } catch (e) {
      throw new Error(e)
    }
  }
  viewPackage(e, itemName, itemValue) {
    const { toggleMainLoader } = this.props
    let fixedItemValue

    if (itemName) {
      toggleMainLoader(true)
      triggerEvent('view-package', {
        cmd: ['view'],
        pkgName: itemName
      })
    }

    return false
  }
  handleChange(e, value) {
    this.setState({ activeTab: value })
  }
  render() {
    const { active, classes } = this.props
    const { contributors, dependencies, devDependencies, maintainers } = active
    const { activeTab } = this.state

    const dependenciesTotal = dependencies && Object.keys(dependencies).length
    const devDependenciesTotal =
      devDependencies && Object.keys(devDependencies).length
    const maintainersTotal = maintainers && maintainers.length
    const contributorsTotal = contributors && contributors.length

    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Tabs
            value={activeTab}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            fullWidth
          >
            <Tab icon={<TimelineIcon />} label="Statistics" />
            <Tab
              icon={<CodeIcon />}
              label={`Dependencies ${dependenciesTotal || 0}`}
            />
            <Tab
              icon={<BuildIcon />}
              label={`Dev dependencies ${devDependenciesTotal || 0}`}
            />
            <Tab
              icon={<GroupIcon />}
              label={`Maintainers ${maintainersTotal || 0}`}
            />
            <Tab
              icon={<GroupIcon />}
              label={`Contributors ${contributorsTotal || 0}`}
            />
          </Tabs>
        </AppBar>
        {activeTab === 1 && (
          <TabContainer>{this.buildList(dependencies)}</TabContainer>
        )}
        {activeTab === 2 && (
          <TabContainer>{this.buildList(devDependencies)}</TabContainer>
        )}
        {activeTab === 0 ? (
          <div className={classes.graphContent}>
            <Typography
              component="h3"
              variant="title"
              className={classes.heading}
            >
              Versioning over time
            </Typography>
            <TimeGraph active={active} />
          </div>
        ) : null}
        {activeTab === 3 && (
          <TabContainer>{this.buildList(maintainers, true)}</TabContainer>
        )}
        {activeTab === 4 && (
          <TabContainer>{this.buildList(contributors, true)}</TabContainer>
        )}
      </div>
    )
  }
}

CardTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  dependencies: PropTypes.object,
  devDependencies: PropTypes.object,
  maintainers: PropTypes.array,
  contributors: PropTypes.array
}

export default withStyles(styles)(CardTabs)
