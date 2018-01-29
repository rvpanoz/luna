"use strict";

import { remote, ipcRenderer } from "electron";
import React from "react";
import * as R from "ramda";
import { ListItem, ListItemSecondaryAction, ListItemText } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import Avatar from "material-ui/Avatar";
import Icon from "material-ui/Icon";

class PackageListItem extends React.Component {
  constructor(props) {
    super(props);
    this._needsUpdates = true;
    this.onItemClick = this.onItemClick.bind(this);
  }
  onItemClick(e) {
    const { name, version, mode, directory, toggleMainLoader } = this.props;
    e.preventDefault();
    toggleMainLoader(true);
    ipcRenderer.send("ipc-event", {
      ipcEvent: "view-package",
      cmd: ["view"],
      pkgName: name,
      pkgVersion: version,
      mode,
      directory
    });
    return false;
  }
  render() {
    const { classes, name, version, latest } = this.props;

    if (!name) {
      return null;
    }

    return (
      <ListItem button onClick={this.onItemClick}>
        <Avatar>
          <Icon>{latest ? "update" : "done"}</Icon>
        </Avatar>
        <ListItemText primary={name} secondary={version} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Uninstall">delete</IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default PackageListItem;
