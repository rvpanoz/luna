/**
 * ListHeader
 *
 */

import { withStyles } from "material-ui/styles";
import { listStyles } from "./styles";
import { autoBind, triggerEvent } from "utils";
import React from "react";
import PropTypes from "prop-types";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import Typography from "material-ui/Typography";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import MoreVertIcon from "material-ui-icons/MoreVert";
import RefreshIcon from "material-ui-icons/Refresh";
import ListIcon from "material-ui-icons/List";
const ITEM_HEIGHT = 48;

class ListHeader extends React.Component {
  constructor() {
    super();
    this._anchorEl = null;
    autoBind(
      [
        "_reload",
        "_setGlobalMode",
        "onUninstallSelected",
        "onUpdateSelected",
        "handleClick",
        "handleClose",
        "handleSortByLatest",
        "handleSortByName"
      ],
      this
    );
  }
  _setGlobalMode(e) {
    const { setGlobalMode } = this.props;
    setGlobalMode();
    this.handleClose();
  }
  _reload(e) {
    const { reload } = this.props;
    reload();
    this.handleClose();
  }
  onUninstallSelected(e) {}
  onUpdateSelected(e) {
    const { mode, directory, toggleLoader, selected } = this.props;

    if (selected.length) {
      toggleLoader(true);
      triggerEvent("install", {
        cmd: ["install"],
        mode,
        directory,
        multiple: true,
        packages: selected
      });
    }
  }
  handleClick(e) {
    this._anchorEl = e.currentTarget;
    this.forceUpdate();
  }
  handleClose() {
    this._anchorEl = null;
    this.forceUpdate();
  }
  handleSortByName() {
    const { sortBy } = this.props;
    sortBy("from");
    this.handleClose();
  }
  handleSortByLatest() {
    const { sortBy } = this.props;
    sortBy("latest");
    this.handleClose();
  }
  render() {
    const { classes, total, mode, directory, title } = this.props;
    const anchorEl = this._anchorEl;

    return (
      <section className={classes.flexColumn}>
        <div className={classes.flexRow}>
          <h3 className={classes.heading}>{title}</h3>
          <Avatar className={classes.avatar} color="accent">
            {total || 0}
          </Avatar>
          <IconButton className={classes.iconbutton} aria-label="show globals">
            <ListIcon onClick={this._setGlobalMode} />
          </IconButton>
          <IconButton className={classes.iconbutton} aria-label="reload">
            <RefreshIcon onClick={this._reload} />
          </IconButton>
          <div style={{ marginLeft: "auto" }}>
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? "long-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.iconbutton}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 6.5,
                  width: 200
                }
              }}
            >
              <MenuItem key="sort-name" onClick={this.handleSortByName}>
                <Icon color="accent">sort</Icon>
                <span style={{ paddingLeft: "10px" }}>Sort by name</span>
              </MenuItem>
              <MenuItem key="sort-latest" onClick={this.handleSortByLatest}>
                <Icon color="accent">sort</Icon>
                <span style={{ paddingLeft: "10px" }}>Sort by outdated</span>
              </MenuItem>
              <Divider />
              <MenuItem key="update-all" onClick={this.onUpdateSelected}>
                <Icon color="accent">update</Icon>
                <span style={{ paddingLeft: "10px" }}>Update</span>
              </MenuItem>
              <MenuItem key="uninstall-all" onClick={this.onUninstallSelected}>
                <Icon color="accent">uninstall</Icon>
                <span style={{ paddingLeft: "10px" }}>Uninstall1</span>
              </MenuItem>
            </Menu>
          </div>
        </div>
        {directory ? (
          <div className={classes.flexRow}>
            <Typography align="left" paragraph className={classes.directory}>
              {directory}
            </Typography>
          </div>
        ) : null}
        <Divider />
      </section>
    );
  }
}

const { object, number, string } = PropTypes;

ListHeader.propTypes = {
  classes: object.isRequired,
  mode: string.isRequired,
  total: number,
  directory: string,
  title: string
};

export default withStyles(listStyles)(ListHeader);
