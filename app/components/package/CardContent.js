/**
 * CardContent component
 *
 */

import { CardContent as MuiCardContent } from 'material-ui/Card'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { APP_INFO, APP_MODES } from 'constants/AppConstants'
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import PermIdentity from 'material-ui-icons/PermIdentity'
import HomeIcon from 'material-ui-icons/Home'
import RefreshIcon from 'material-ui-icons/Refresh'
import VerifiedUserIcon from 'material-ui-icons/VerifiedUser'
import BugReport from 'material-ui-icons/BugReport'
import CardOptions from './CardOptions'
import CardVersions from './CardVersions'

const { object, array, func, string } = PropTypes

const CardContent = (props) => {
  const {
    classes,
    active,
    mode,
    version,
    cmdOptions,
    onChangeVersion,
    addCommandOption,
    clearCommandOptions
  } = props

  if (!active) {
    return null
  }

  const dependencies = Object.keys(active.dependencies || {})
  const { latest, stable } = active['dist-tags']

  return (
    <MuiCardContent className={classes.cardContent}>
      <h3 className={classes.heading}>Versions and options</h3>
      <Divider />
      <section className={classes.controls}>
        <CardVersions
          classes={classes}
          active={active}
          onChangeVersion={onChangeVersion}
        />
        {mode && mode === APP_MODES.LOCAL ? (
          <CardOptions
            cmdOptions={cmdOptions}
            addCommandOption={addCommandOption}
          />
        ) : null}
      </section>
      <h3 className={classes.heading}>Description</h3>
      <Divider />
      <Typography className={classes.headingTail}>
        {active.description}
      </Typography>
      <h3 className={classes.heading}>Details and Dependencies</h3>
      <Divider />
      <div className={classes.content}>
        <List
          dense={true}
          className={classnames(classes.innerList, classes.innerListLong)}
        >
          <ListItem>
            <Avatar>
              <RefreshIcon />
            </Avatar>
            <ListItemText primary={latest} secondary="latest" />
          </ListItem>
          <ListItem>
            <Avatar>
              <PermIdentity />
            </Avatar>
            <ListItemText
              primary={active.author || APP_INFO.NOT_AVAILABLE}
              secondary="author"
            />
          </ListItem>
          <ListItem>
            <Avatar>
              <VerifiedUserIcon />
            </Avatar>
            <ListItemText
              primary="Licence"
              secondary={active.license || APP_INFO.NOT_AVAILABLE}
            />
          </ListItem>
          <ListItem>
            <Avatar>
              <HomeIcon />
            </Avatar>
            <ListItemText
              primary={active.homepage || APP_INFO.NOT_AVAILABLE}
              secondary="homepage"
            />
          </ListItem>
          <ListItem>
            <Avatar>
              <BugReport />
            </Avatar>
            <ListItemText
              primary={
                (active.bugs && active.bugs.url) || APP_INFO.NOT_AVAILABLE
              }
              secondary="issues"
            />
          </ListItem>
        </List>
        <List
          className={classnames(classes.innerList, classes.innerListLong)}
          dense={true}
        >
          {dependencies &&
            dependencies.map((dependency, idx) => {
              const version = active.dependencies[dependency]
              return (
                <ListItem key={idx} className={classes.listItem}>
                  <ListItemText
                    inset
                    primary={dependency}
                    secondary={version}
                  />
                </ListItem>
              )
            })}
        </List>
      </div>
      <div className={classes.keywords} />
    </MuiCardContent>
  )
}

CardContent.propTypes = {
  version: string,
  cmdOptions: array,
  classes: object.isRequired,
  active: object.isRequired,
  onChangeVersion: func.isRequired,
  clearCommandOptions: func.isRequired
}

export default CardContent
