/**
AppHeader with mini drawer
**/

import { toggleLoader, toggleSettings } from "actions/globalActions";
import { setActive } from "actions/packagesActions";
import { APP_MODES } from "constants/AppConstants";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import React from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Drawer from "material-ui/Drawer";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import classNames from "classnames";
import Icon from "material-ui/Icon";
import MenuIcon from "material-ui-icons/Menu";
import IconButton from "material-ui/IconButton";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import ChevronRightIcon from "material-ui-icons/ChevronRight";
import AppHeaderContent from "./AppHeaderContent";
import SearchBox from "./SearchBox";
import { firstToUpper } from "../../utils";
import { appHeaderStyles } from "../styles";

const { object } = PropTypes;

class AppHeader extends React.Component {
  constructor() {
    super();
  }
  render() {
    const {
      menuOpen,
      classes,
      handleDrawerOpen,
      handleDrawerClose,
      mode,
      directory,
      theme,
      setActive,
      toggleLoader,
      toggleSettings
    } = this.props;

    return (
      <section>
        <AppBar className={classNames(classes.appBar, menuOpen && classes.appBarShift)}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Toolbar disableGutters={!menuOpen}>
              <IconButton
                color="inherit"
                aria-label="open menu"
                onClick={handleDrawerOpen}
                className={classNames(classes.menuButton, menuOpen && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
            <div className={classes.info}>
              <Icon className={classes.modeIcon}>
                {mode === APP_MODES.GLOBAL ? "language" : "home"}
              </Icon>
              <span className={classes.mode}>{firstToUpper(mode)}</span>
            </div>
            <SearchBox setActive={setActive} toggleLoader={toggleLoader} />
          </div>
        </AppBar>
        <Drawer
          type="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !menuOpen && classes.drawerPaperClose)
          }}
          open={menuOpen}
        >
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <AppHeaderContent toggleSettings={toggleSettings} />
          </div>
        </Drawer>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActive: (active) => dispatch(setActive(active)),
    toggleSettings: (bool) => dispatch(toggleSettings(bool)),
    toggleLoader: (bool) => dispatch(toggleLoader(bool))
  };
}

AppHeader.propTypes = {
  classes: object.isRequired,
  theme: object.isRequired
};

export default compose(
  withStyles(appHeaderStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(AppHeader);
