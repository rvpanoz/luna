"use strict";

import { remote, ipcRenderer } from "electron";
import React from "react";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Icon from "material-ui/Icon";
import { APP_MODES } from "../constants/AppConstants";
import { withStyles } from "material-ui/styles";
import { appHeaderContentStyles } from "./styles";
import Modal from "material-ui/Modal";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";

class AppHeaderContent extends React.Component {
  constructor() {
    super();
    this.openPackage = this.openPackage.bind(this);
    this.updateMode = this.updateMode.bind(this);
  }
  updateMode(directory) {
    ipcRenderer.send("analyze-json", directory);
  }
  getModalStyles() {
    function rand() {
      return Math.floor(Math.random() * 20) - 10;
    }

    const top = 50 + rand();
    const left = 50 + rand();

    return {
      position: "absolute",
      width: 8 * 50,
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      border: "1px solid #e5e5e5",
      backgroundColor: "#fff",
      boxShadow: "0 5px 15px rgba(0, 0, 0, .5)",
      padding: 8 * 4
    };
  }
  openSettings() {}
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
  render() {
    const { classes } = this.props;
    const npmRegistry = "https://registry.npmjs.org/";
    const npmProxy = "http://proxy.company.com:8080";

    return (
      <section>
        <List>
          <ListItem button onClick={this.openPackage}>
            <ListItemIcon>
              <Icon className={classes.iconHover}>send</Icon>
            </ListItemIcon>
            <ListItemText primary="Analyze" secondary="Open package.json" />
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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={true}
          onClose={this.handleModal}
        >
          <div style={this.getModalStyles()} className={classes.paper}>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="npm-registry"
                label="Registry"
                className={classes.textField}
                value={npmRegistry}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                id="npm-proxy"
                label="Proxy"
                className={classes.textField}
                value={npmProxy}
                onChange={this.handleChange}
                margin="normal"
              />
            </form>
          </div>
        </Modal>
      </section>
    );
  }
}

export default withStyles(appHeaderContentStyles)(AppHeaderContent);
