/**
 * CardTags component
 */

import { objectEntries } from 'utils'
import { withStyles } from 'material-ui/styles'
import { autoBind, triggerEvent } from 'utils'
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import classnames from 'classnames'
import React from 'react'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import InfoIcon from 'material-ui-icons/Description'

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

class CardTags extends React.Component {
  constructor(props) {
    super(props)
    autoBind(['getTags', 'viewPackage'], this)
  }
  getTags() {
    const { active, classes } = this.props
    const data = active['dist-tags'] && objectEntries(active['dist-tags'])

    if (data) {
      const tags =
        data &&
        data
          .map((item) => {
            return {
              name: item[0],
              version: item[1]
            }
          })
          .filter((i) => typeof i === 'object')

      return tags
    }
    return null
  }
  viewPackage(e, itemName, itemValue) {
    const { active, toggleMainLoader } = this.props
    const { name } = active;

    if (name && itemName) {
      toggleMainLoader(true)
      triggerEvent('view-package', {
        cmd: ['view'],
        pkgName: name,
        pkgVersion: itemName
      })
    }

    return false
  }
  render() {
    const { active, classes } = this.props

    if (!active) {
      return null
    }

    const tags = this.getTags()
    return (
      <div className={classnames(classes.list, classes.innerListSmall)}>
        <List>
          {tags &&
            tags.map((d, idx) => {
              return (
                <ListItem key={`tag-${idx}`}>
                  <ListItemText primary={d.name} secondary={d.version} />
                  <ListItemSecondaryAction>
                  <Tooltip
                    enterDelay={300}
                    leaveDelay={300}
                    placement="left"
                    title="Preview tag"
                  >
                    <IconButton aria-label="Preview">
                      <InfoIcon
                        onClick={(e) => {
                          this.viewPackage(e, d.name)
                        }}
                      />
                    </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(CardTags)
