/**
 * Card tabs component
 **/

import { withStyles } from 'material-ui/styles'
import { APP_INFO } from 'constants/AppConstants'
import { autoBind, objectEntries } from 'utils'
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'
import List, { ListItem, ListItemText } from 'material-ui/List'
import classnames from 'classnames'
import {
  List as ListIcon,
  Code as CodeIcon,
  Build as BuildIcon,
  Group as GroupIcon,
  PermIdentity as UserIcon
} from 'material-ui-icons'

const styles = (theme) => {
  return {
    root: {
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
      backgroundColor: theme.palette.white,
      height: 347
    },
    list: {
      visibility: 'visible',
      overflowX: 'hidden',
      overflowY: 'scroll',
      clear: 'both',
      maxHeight: '750px'
    },
    innerListSmall: {
      maxHeight: '300px'
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
      active: 0
    }
    autoBind(['buildList', 'handleChange'], this)
  }
  buildList(data, onlyValues) {
    const { classes } = this.props
    const dataType = data && typeof data

    try {
      const dataArr = data && objectEntries(data)

      if (!dataArr || !dataArr.length) {
        return 'No data'
      }

      return (
        <div className={classnames(classes.list, classes.innerListSmall)}>
          <List>
            {dataArr &&
              dataArr.map((item, idx) => {
                const itemName = item[0]
                const itemValue = item[1]

                return (
                  <ListItem key={`itemk-${idx}`}>
                    <ListItemText
                      primary={onlyValues ? itemValue : itemName}
                      secondary={onlyValues ? null : itemValue}
                    />
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
  handleChange(e, value) {
    this.setState({ active: value })
  }
  render() {
    const {
      classes,
      contributors,
      dependencies,
      devDependencies,
      maintainers
    } = this.props
    const { active } = this.state

    const dependenciesTotal = dependencies && Object.keys(dependencies).length
    const devDependenciesTotal =
      devDependencies && Object.keys(devDependencies).length
    const maintainersTotal = maintainers && maintainers.length
    const contributorsTotal = contributors && contributors.length

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={active}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            fullWidth
          >
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
        {active === 0 && (
          <TabContainer>{this.buildList(dependencies)}</TabContainer>
        )}
        {active === 1 && (
          <TabContainer>{this.buildList(devDependencies)}</TabContainer>
        )}
        {active === 2 && (
          <TabContainer>{this.buildList(maintainers, true)}</TabContainer>
        )}
        {active === 3 && (
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
