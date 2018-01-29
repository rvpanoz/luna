"use strict";

import { remote, ipcRenderer } from "electron";
import React from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import { packagesListStyles } from "../styles";

class PackagesListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e) {
      e.preventDefault();
    }
    const { mode, directory, toggleLoader, setActive, setPackageActions } = this.props;
    const value = e.target.value;

    if (value && value.length > 2) {
      toggleLoader(true);
      setActive(null);
      setPackageActions([
        {
          text: "Install",
          iconCls: "download"
        }
      ]);

      ipcRenderer.send("ipc-event", {
        ipcEvent: "search-packages",
        cmd: ["search"],
        pkgName: value
      });
    }
    return false;
  }
  componentDidMount() {
    let root = this.refs.root;
    if (root) {
      root.addEventListener("keypress", this._onKeyUp);
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <TextField
        id="search"
        label="Search"
        type="search"
        className={classes.textField}
        margin="normal"
        onChange={this.handleChange}
      />
    );
  }
}

export default withStyles(packagesListStyles)(PackagesListSearch);
