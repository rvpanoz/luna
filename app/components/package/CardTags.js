//WIP

import { objectEntries } from 'utils'
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import classnames from 'classnames'
import React from 'react'

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
    const { active } = this.props

    if (!active) {
      return null
    }

    const tags = this._getTags()
    return (
      <List
        dense={true}
        subheader="Dist tags"
        className={classnames('innerList', 'innerListSmall')}
      >
        {tags &&
          tags.map((d, idx) => {
            return (
              <ListItem>
                <ListItemText
                  key={`tag-${idx}`}
                  primary={d.name}
                  secondary={d.version}
                />
              </ListItem>
            )
          })}
      </List>
    )
  }
}

export default CardTags
