import List, { ListItem, ListItemText } from 'material-ui/List'
import React from 'react'
import PropTypes from 'prop-types'

function renderItem(item) {
  console.log(item)
  return (
    <ListItem key={item}>
      <ListItemText primary={item} secondary="Jan 9, 2014" />
    </ListItem>
  )
}

function buildItems(items) {
  const isItemsArray = items && Array.isArray(items)
  const typeOfItems = typeof items

  if (isItemsArray === true) {
    items.map((item, idx) => {
      return (
        <ListItem key={idx}>
          <ListItemText primary={item} secondary="Jan 9, 2014" />
        </ListItem>
      )
    })
  } else if (typeOfItems === 'object') {
    Object.keys(items).map((item, idx) => {
      return renderItem(item)
    })
  }
}

class ViewList extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {}
  render() {
    const { items } = this.props
    return <List>{buildItems(items)}</List>
  }
}

export default ViewList
