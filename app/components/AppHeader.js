"use strict";

import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Drawer from "material-ui/Drawer";
import * as globalActions from "../actions/global_actions";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import classNames from "classnames";
import MenuIcon from "material-ui-icons/Menu";
import IconButton from "material-ui/IconButton";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import ChevronRightIcon from "material-ui-icons/ChevronRight";

const drawerWidth = 240;

const styles = (theme) => ({
  appBar: {
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  }
});

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  handleDrawerOpen() {}
  handleDrawerClose() {}
  render() {
    const { title, open, handleDrawerOpen, handleDrawerClose, classes, theme } = this.props;

    return (
      <section>
        <AppBar className={classNames(classes.appBar, open && classes.appBarShift)}>
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          type="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
          </div>
        </Drawer>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuOpen: state.global.menuOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleDrawerOpen: () => dispatch(globalActions.handleDrawerOpen(false)),
    handleDrawerClose: () => dispatch(globalActions.handleDrawerClose(true))
  };
}

export default compose(withStyles(styles), connect())(AppHeader);
