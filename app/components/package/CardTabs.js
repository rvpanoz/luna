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
  Group as GroupIcon,
  PermIdentity as UserIcon
} from 'material-ui-icons'

const styles = (theme) => {
  return {
    root: {
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
      backgroundColor: theme.palette.white
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

    try {
      const dataArr = objectEntries(data)

      return (
        <div className={classnames(classes.list, classes.innerListSmall)}>
          <List>
            {dataArr &&
              dataArr.map((item, idx) => {
                const itemName = item[0]
                const itemValue = item[1]

                return (
                  <ListItem>
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
    const { classes, dependencies, devDependencies, maintainers } = this.props
    const { active } = this.state

    const dependenciesTotal =
      dependencies && `Dependencies (${Object.keys(dependencies).length})`
    const devDependenciesTotal =
      devDependencies &&
      `Dev dependencies (${Object.keys(devDependencies).length})`
    const maintainersTotal =
      maintainers && `Maintainers (${Object.keys(maintainers).length})`
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={active}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="inherit"
            fullWidth
          >
            <Tab icon={<ListIcon />} label={dependenciesTotal} />
            <Tab icon={<GroupIcon />} label={devDependenciesTotal} />
            <Tab icon={<UserIcon />} label={maintainersTotal} />
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
      </div>
    )
  }
}

CardTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  dependencies: PropTypes.object,
  devDependencies: PropTypes.object,
  maintainers: PropTypes.object
}

export default withStyles(styles)(CardTabs)
