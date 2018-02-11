import { CardContent as MuiCardContent } from 'material-ui/Card'
import List, { ListItem, ListItemText } from 'material-ui/List'
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import classnames from 'classnames'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Avatar from 'material-ui/Avatar'
import HomeIcon from 'material-ui-icons/Home'
import Assistant from 'material-ui-icons/Assistant'
import BugReport from 'material-ui-icons/BugReport'
import PermIdentity from 'material-ui-icons/PermIdentity'
import CardDetails from './CardDetails'

const { object } = PropTypes

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const CardContent = (props) => {
  const {
    classes,
    active,
    mode,
    handleChange,
    tabIndex,
    buildLink,
    version,
    cmdOptions,
    onChangeVersion,
    addCommandOption,
    clearCommandOptions
  } = props

  if (!active) {
    return null
  }

  return (
    <MuiCardContent className={classes.cardContent}>
      <section>
        <h3 className={classes.heading}>Description</h3>
        <Divider />
        <Typography className={classes.description}>
          {active.description ? active.description : 'No description available'}
        </Typography>
      </section>
      <section>
        <h3 className={classnames(classes.heading, classes.headingTail)}>
          Details
        </h3>
        <Divider />
        <CardDetails
          active={active}
          classes={classes}
          onChangeVersion={onChangeVersion}
          version={version}
          cmdOptions={cmdOptions}
          mode={mode}
          addCommandOption={addCommandOption}
          clearCommandOptions={clearCommandOptions}
        />
        <div className={classes.detailsTabs}>
          <AppBar
            position="static"
            color="default"
            className={classes.detailsAppBar}
          >
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              scrollable
              scrollButtons="on"
              indicatorColor="secondary"
              textColor="accent"
            >
              <Tab label="Homepage" icon={<HomeIcon />} />
              <Tab label="Issues" icon={<BugReport />} />
              <Tab label="Author" icon={<Assistant />} />
              <Tab label="License" icon={<PermIdentity />} />
            </Tabs>
          </AppBar>
          {tabIndex === 0 && <TabContainer>{active.homepage}</TabContainer>}
          {tabIndex === 1 && (
            <TabContainer>{active.bugs && active.bugs.url}</TabContainer>
          )}
          {tabIndex === 2 && <TabContainer>{active.author}</TabContainer>}
          {tabIndex === 3 && <TabContainer>{active.license}</TabContainer>}
        </div>
      </section>
    </MuiCardContent>
  )
}

CardContent.propTypes = {
  classes: object,
  active: object
}

export default CardContent
