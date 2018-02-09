import { CardContent as MuiCardContent } from 'material-ui/Card'
import List, { ListItem, ListItemText } from 'material-ui/List'
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import classnames from 'classnames'
import Avatar from 'material-ui/Avatar'
import Home from 'material-ui-icons/Home'
import BugReport from 'material-ui-icons/BugReport'

const { object } = PropTypes

const CardContent = (props) => {
  const { classes, active, buildLink } = props

  if (!active) {
    return null
  }

  return (
    <MuiCardContent>
      <section>
        <h3 className={classes.heading}>Description</h3>
        <Divider />
        <Typography className={classes.description}>
          {active.description}
        </Typography>
      </section>
      <section>
        <h3 className={classnames(classes.heading, classes.headingTail)}>
          Details
        </h3>
        <Divider />
        <List className={classes.list}>
          {[
            { text: 'Homepage', url: active.homepage },
            { text: 'Issues', url: active.bugs.url }
          ].map((item, key) => {
            return (
              <ListItem key={key}>
                <Avatar>
                  {item.text === 'Homepage' && <Home />}
                  {item.text === 'Issues' && <BugReport />}
                </Avatar>
                <ListItemText
                  primary={item.text}
                  secondary={buildLink(item.text, item.url)}
                />
              </ListItem>
            )
          })}
        </List>
      </section>
    </MuiCardContent>
  )
}

CardContent.propTypes = {
  classes: object,
  active: object
}

export default CardContent
