"use strict";

import { remote, ipcRenderer } from "electron";
import React from "react";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Icon from "material-ui/Icon";
import * as globalActions from "actions/global_actions";
import { APP_MODES } from "constants/AppConstants";
import { withStyles } from "material-ui/styles";
import Divider from "material-ui/Divider";
import Tooltip from "material-ui/Tooltip";
import { appHeaderContentStyles } from "../styles";

class AppHeaderContent extends React.Component {
  constructor() {
    super();
    this.openPackage = this.openPackage.bind(this);
    this.updateMode = this.updateMode.bind(this);
    this.toggleAppSettings = this.toggleAppSettings.bind(this);
  }
  updateMode(directory) {
    ipcRenderer.send("analyze-json", directory);
  }
  handleChange(e) {
    // console.log(e.target.value);
  }
  openPackage(e) {
    e.preventDefault();
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        title: "Open package.json file",
        buttonLabel: "Analyze",
        filters: [
          {
            name: "json",
            extensions: ["json"]
          }
        ],
        openFile: true
      },
      (filePath) => {
        if (filePath) {
          this.updateMode(filePath[0]);
        }
      }
    );
  }
  toggleAppSettings(e) {
    e.preventDefault();
    const { toggleSettings } = this.props;
    toggleSettings(true);
  }
  render() {
    const { classes } = this.props;

    return (
      <section>
        <List>
          <ListItem button onClick={this.openPackage}>
            <Tooltip title="Analyze package.json file" placement="right-start">
              <ListItemIcon>
                <Icon className={classes.iconHover}>send</Icon>
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Analyze" secondary="Open package.json" />
          </ListItem>
          <ListItem button onClick={this.toggleAppSettings}>
            <Tooltip title="Open application settings" placement="right-start">
              <ListItemIcon>
                <Icon>settings</Icon>
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Settings" secondary="Application settings" />
          </ListItem>
        </List>
      </section>
    );
  }
}

export default withStyles(appHeaderContentStyles)(AppHeaderContent);
