import { objectEntries } from 'utils'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import classnames from 'classnames'
import React from 'react'

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
    }
  }
}

class CardTags extends React.Component {
  constructor(props) {
    super(props)
    this._getTags = this._getTags.bind(this)
  }
  _getTags() {
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
  render() {
    const { active, classes } = this.props

    if (!active) {
      return null
    }

    const tags = this._getTags()
    return (
      <div className={classnames(classes.list, classes.innerListSmall)}>
        <List dense={true} subheader="Dist tags">
          {tags &&
            tags.map((d, idx) => {
              return (
                <ListItem key={`tag-${idx}`}>
                  <ListItemText primary={d.name} secondary={d.version} />
                </ListItem>
              )
            })}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(CardTags)
