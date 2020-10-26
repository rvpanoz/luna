import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function System({ userAgent, cache, prefix }) {
  const classes = useStyles();
  const [npm, node, os] = userAgent.split(' ');

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemText primary={node} secondary="node version" />
      </ListItem>
      <ListItem>
        <ListItemText primary={npm} secondary="npm version" />
      </ListItem>
      <ListItem>
        <ListItemText primary={os} secondary="operating system" />
      </ListItem>
      <ListItem>
        <ListItemText primary={cache} secondary="cache location" />
      </ListItem>
      <ListItem>
        <ListItemText primary={prefix} secondary="prefix" />
      </ListItem>
    </List>
  );
}
