/**
 * Card details content (expanded)
 **/

import { APP_INFO } from 'constants/AppConstants'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import PermIdentity from 'material-ui-icons/PermIdentity'
import HomeIcon from 'material-ui-icons/Home'
import RefreshIcon from 'material-ui-icons/Refresh'
import VerifiedUserIcon from 'material-ui-icons/VerifiedUser'
import BugReport from 'material-ui-icons/BugReport'

const styles = (theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  inner: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexItem: {
    flex: 'auto'
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  innerList: {
    visibility: 'visible',
    overflowX: 'hidden',
    overflowY: 'auto',
    clear: 'both',
    maxHeight: '750px'
  }
})

const CardInfo = (props) => {
  const { classes, active } = props
  const dependencies = Object.keys(active.dependencies || {})
  const { latest, stable } = active['dist-tags'] || {}

  return (
    <section className={classes.root}>
      <div className={classes.inner}>
        <Typography component="div" className={classes.content}>
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
                const version = active && active.dependencies[dependency]
                return (
                  <ListItem key={idx} className={classes.listItem}>
                    <ListItemText
                      inset
                      primary={dependency}
                      secondary={version || null}
                    />
                  </ListItem>
                )
              })}
          </List>
        </Typography>
      </div>
    </section>
  )
}

const { object, array } = PropTypes

CardInfo.propTypes = {
  classes: object.isRequired,
  active: object.isRequired
}

export default withStyles(styles)(CardInfo)
