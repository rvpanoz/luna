import React from "react";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { withStyles } from "material-ui/styles";
import Checkbox from "material-ui/Checkbox";

const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const ListView = (props) => {
  const { classes } = props;
  return (
    <List>
      {[0, 1, 2, 3].map((value) => (
        <ListItem key={value} dense button className={classes.listItem}>
          <Checkbox checked={true} tabIndex={-1} disableRipple />
          <ListItemText primary={`Line item`} />
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(ListView);
