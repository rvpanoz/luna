/**
 * CardTags component
 */

import { objectEntries, firstToUpper } from 'utils'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader, CardContent } from 'material-ui/Card'
import { pickAll } from 'ramda'
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import Typography from 'material-ui/Typography'
import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import InfoButton from 'material-ui-icons/Info'
import UpdateIcon from 'material-ui-icons/Update'

const styles = (theme) => {
  return {
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

class Statslist extends React.Component {
  constructor(props) {
    super(props)
    this.parseStats = this.parseStats.bind(this)
  }
  parseStats() {
    const { stats, classes } = this.props

    const data = objectEntries(
      pickAll(
        ['stargazers_count', 'watchers_count', 'forks_count'],
        stats || {}
      )
    ).map((a, idx) => {
      return {
        name: firstToUpper(a[0].split('_')[0]),
        value: a[1] || 0
      }
    })

    return data
  }
  render() {
    const { stats, classes } = this.props

    if (!stats) {
      return null
    }

    const statsArr = this.parseStats()

    return (
      <div className={classnames(classes.list, classes.innerListSmall)}>
        <List>
          {statsArr &&
            statsArr.map((d, idx) => {
              return (
                <ListItem key={`tag-${idx}`}>
                  <ListItemText primary={d.name} secondary={d.value} />
                </ListItem>
              )
            })}
        </List>
      </div>
    )
  }
}

Statslist.propTypes = {
  classes: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired
}

export default withStyles(styles)(Statslist)
