/**
 * AppHeader Menu content
 *
 *
 */

import { remote, ipcRenderer } from "electron";
import { withStyles } from "material-ui/styles";
import React from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Icon from "material-ui/Icon";
import Divider from "material-ui/Divider";
import Tooltip from "material-ui/Tooltip";

const styles = {
  iconHover: {
    '&:hover': {
      fill: 'rgb(225, 0, 80)'
    }
  }
}

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
  openPackage(e) {
    e.preventDefault();
    const {handleDrawerClose} = this.props;

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
        handleDrawerClose()
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
            <ListItemIcon>
              <Icon className={classes.iconHover}>archive</Icon>
            </ListItemIcon>
            <ListItemText primary="Analyze" secondary="Open package.json" />
          </ListItem>
          <ListItem button onClick={this.toggleAppSettings}>
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText primary="Settings" secondary="Application settings" />
          </ListItem>
        </List>
      </section>
    );
  }
}

const { object } = PropTypes;

AppHeaderContent.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(AppHeaderContent);
