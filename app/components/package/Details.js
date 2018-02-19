import React from 'react'

const Details = (props) => {
  return (
    <List>
      <ListItem>
        <Avatar>
          <HomeIcon />
        </Avatar>
        <ListItemText primary="Home" secondary={active.homepage} />
      </ListItem>
      <li>
        <Divider inset />
      </li>
      <ListItem>
        <Avatar>
          <BugReport />
        </Avatar>
        <ListItemText primary="Issues" secondary={active.bugs.url} />
      </ListItem>
      <Divider inset component="li" />
      <ListItem>
        <Avatar>
          <PermIdentity />
        </Avatar>
        <ListItemText primary="Licence" secondary={active.license} />
      </ListItem>
      <Divider inset component="li" />
      <ListItem>
        <Avatar>
          <Assistant />
        </Avatar>
        <ListItemText primary="Author" secondary={active.author} />
      </ListItem>
    </List>
  )
}
