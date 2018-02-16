/**
Layout component
* */

import { remote, ipcRenderer } from "electron";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import * as globalActions from "actions/globalActions";
import { styles } from "./styles";
import { NPM_CONFIG_VALUES } from "constants/AppConstants";
import { merge } from "ramda";
import { autoBind } from "../utils";
import Grid from "material-ui/Grid";
import React from "react";
import PropTypes from "prop-types";
import AppMenu from "components/header/AppMenu";
import PackagesContainer from "./Packages";

class Layout extends React.Component {
  constructor() {
    super();
    autoBind(["handleModal", "onChangeNpmSetting", "setNpmRegistry"], this);
  }
  handleModal() {
    const { closeSettings } = this.props;
    closeSettings();
  }
  componentDidMount() {
    const { setSettings } = this.props;

    ipcRenderer.send("ipc-event", {
      ipcEvent: "get-settings",
      cmd: "config",
      pkgName: "list" // hack
    });

    ipcRenderer.on("get-settings-close", (event, settings) => {
      try {
        const settingsList = JSON.parse(settings);
        setSettings(settingsList);
      } catch (e) {
        throw new Error(e);
      }
    });
  }
  onChangeNpmSetting(e) {
    const { setSettings, settings } = this.props;
    const inputEl = e.currentTarget;
    const setting = inputEl && inputEl.getAttribute("setting");
    const value = inputEl && inputEl.value;

    let stateObj = {};
    if (value && setting) {
      stateObj[setting] = value;
      setSettings(merge(settings, stateObj));
    }
  }
  setNpmRegistry(e) {
    const { settings } = this.props;
    const registry = settings.registry;
    const cmd = "set registry [0]";

    ipcRenderer.send("ipc-event", {
      ipcEvent: "set-registry",
      cmd: [cmd.replace("[0]", registry)]
    });
  }

  render() {
    const {
      classes,
      settings,
      menuOpen,
      handleDrawerOpen,
      settingsOpen,
      handleDrawerClose
    } = this.props;

    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <AppMenu />
        </header>
        <main className={classes.content}>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={9} md={9} lg={9}>
              <PackagesContainer />
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuOpen: state.global.menuOpen,
    settingsOpen: state.global.settingsOpen,
    settings: state.global.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSettings: (settings) => dispatch(globalActions.setSettings(settings)),
    closeSettings: () => dispatch(globalActions.toggleSettings(false)),
    handleDrawerOpen: () => dispatch(globalActions.handleDrawer(true)),
    handleDrawerClose: () => dispatch(globalActions.handleDrawer(false))
  };
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Layout);
