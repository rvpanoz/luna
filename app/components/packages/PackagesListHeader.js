"use strict";

import React from "react";
import { remote, ipcRenderer } from "electron";
import { connect } from "react-redux";
import { compose } from "redux";
import { APP_MODES } from "../../constants/AppConstants";
import { withStyles } from "material-ui/styles";
import * as packagesActions from "../../actions/packages_actions";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";
import Typography from "material-ui/Typography";
import classnames from "classnames";
import { packagesListStyles } from "../styles";
import IconButton from "material-ui/IconButton";
import Chip from "material-ui/Chip";
import Menu, { MenuItem } from "material-ui/Menu";
import MoreVertIcon from "material-ui-icons/MoreVert";
import PackagesListSearch from "./PackagesListSearch";

const ITEM_HEIGHT = 48;

class PackagesListHeader extends React.Component {
  constructor(props) {
    super(props);
    this._anchorEl = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClick(e) {
    this._anchorEl = e.currentTarget;
    this.forceUpdate();
  }
  handleClose(e) {
    this._anchorEl = null;
    this.forceUpdate();
  }
  componentWillUpdate() {
    console.log("componentWillUpdate");
    const { total } = this.props;
    console.log(total);
  }
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
    const { total } = this.props;
    console.log(total);
    // const total = packagesData.filter((pkg, idx) => {
    //   return !pkg.peerMissing && pkg.from;
    // }).length;
    // setTotalInstalled(total);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
    const { total } = this.props;
    console.log(total);
  }
  render() {
    const {
      classes,
      packages,
      setGlobalMode,
      mode,
      directory,
      setActive,
      toggleLoader,
      setPackageActions,
      total
    } = this.props;
    let anchorEl = this._anchorEl;

    return (
      <section className={classes.flexColumn}>
        <div className={classes.flexRow}>
          <h3 className={classes.heading}>Packages</h3>
          <Avatar className={classes.purpleAvatar}>{total}</Avatar>
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
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              <MenuItem key="1" onClick={setGlobalMode}>
                Global mode
              </MenuItem>
            </Menu>
          </div>
          <Divider />
        </div>
        <div className={classes.flexRow}>
          <Chip label={mode} className={classes.chip} />
          <Typography
            align="right"
            paragraph={true}
            type="subheading"
            className={classes.directory}
          >
            {directory}
          </Typography>
        </div>
        <PackagesListSearch
          mode={mode}
          directory={directory}
          setPackageActions={setPackageActions}
          toggleLoader={toggleLoader}
          setActive={setActive}
        />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    total: state.packages.total
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTotal: (total) => dispatch(packagesActions.setTotal(total))
  };
}

export default compose(
  withStyles(packagesListStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(PackagesListHeader);
