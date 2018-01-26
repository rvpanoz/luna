import React from "react";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Icon from "material-ui/Icon";

const AppHeaderContent = (props) => {
  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <Icon>send</Icon>
        </ListItemIcon>
        <ListItemText primary="Analyze" secondary="Open a package.json" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Icon>list</Icon>
        </ListItemIcon>
        <ListItemText primary="Outdated" secondary="Outdated packages" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Settings" secondary="Application settings" />
      </ListItem>
    </List>
  );
};

export default AppHeaderContent;
