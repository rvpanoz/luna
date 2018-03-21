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
  },
  detailsAvatar: {
    marginTop: 15
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  textField: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  description: {
    marginTop: 10
  },
  listItem: {
    paddingLeft: 0
  },
  actions: {
    display: 'flex'
  },
  author: {
    flexGrow: 1
  },
  keywords: {
    flexGrow: 1,
    marginTop: 10
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  updated: {
    fontSize: 12,
    fontWeight: 300,
    color: theme.palette.primary.dark,
    margin: '1em 0 0.7em'
  },
  center: {
    position: 'absolute',
    top: '25%',
    left: '50%'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.dark
  },
  heading: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '1.1rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  headingTail: {
    margin: '0.9em 0 2em'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
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
                <PermIdentity />
              </Avatar>
              <ListItemText
                primary={active.author || APP_INFO.NOT_AVAILABLE}
                secondary="author"
              />
            </ListItem>
            <ListItem>
              <Avatar>
                <HomeIcon />
              </Avatar>
              <ListItemText
                primary="Homepage"
                secondary={<a href="{active.homepage}">Learn more</a>}
              />
            </ListItem>
            <ListItem>
              <Avatar>
                <BugReport />
              </Avatar>
              <ListItemText
                primary="Issues"
                secondary={
                  <a href="{active.bugs && active.bug.url}">Learn more</a>
                }
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
