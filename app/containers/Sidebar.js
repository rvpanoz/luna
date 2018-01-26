/**
 * Sidebar container
 **/

"use strict";

import { remote, ipcRenderer } from "electron";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { APP_MODES, QUICKMENU } from "../constants/AppConstants";
import * as globalActions from "../actions/global_actions";
import * as packagesActions from "../actions/packages_actions";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import Typography from "material-ui/Typography";
import QuickMenu from "../components/sidebar/QuickMenu";
import AnalyzeSection from "../components/sidebar/AnalyzeSection";
import Settings from "../components/sidebar/Settings";
import OutdatedList from "../components/sidebar/OutdatedList";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper
  }
});

class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.updateMode = this.updateMode.bind(this);
    this.openPackage = this.openPackage.bind(this);
    this.handleSidebarTabChange = this.handleSidebarTabChange.bind(this);
  }
  handleSidebarTabChange(e, value) {
    const { setActiveSidebarTab } = this.props;
    e.preventDefault();
    setActiveSidebarTab(value);
  }
  updateMode(directory) {
    this.props.setMode(APP_MODES.LOCAL, directory);
    this.props.setActive(null);
    ipcRenderer.send("analyze-json", directory);
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
    const {
      packagesOutdated,
      toggleMainLoader,
      toggleLoader,
      clearMessages,
      setActive,
      setMode,
      mode,
      classes,
      activeSidebarTab
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={activeSidebarTab} onChange={this.handleSidebarTabChange}>
            <Tab label="Analyze" />
            <Tab label="Outdated" />
            <Tab label="Settings" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        {activeSidebarTab === 0 && (
          <TabContainer>
            <AnalyzeSection />
          </TabContainer>
        )}
        {activeSidebarTab === 1 && (
          <TabContainer>
            <OutdatedList />
          </TabContainer>
        )}
        {activeSidebarTab === 2 && (
          <TabContainer>
            <Settings />
          </TabContainer>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    activeSidebarTab: state.global.activeSidebarTab,
    directory: state.global.directory,
    messages: state.global.messages,
    packages: state.packages.packages,
    packagesInstalled: state.packages.total,
    packagesOutdated: state.packages.outdated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPackages: (packages) => dispatch(packagesActions.setPackages(packages)),
    setPackageActions: (actions) => dispatch(packagesActions.setPackageActions(actions)),
    setPackageJSON: (content) => dispatch(globalActions.setPackageJSON(content)),
    setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
    toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool)),
    toggleMainLoader: (bool) => dispatch(packagesActions.toggleMainLoader(bool)),
    setMode: (mode, directory) => dispatch(globalActions.setMode(mode, directory)),
    setPackagesOutdated: (packages) => dispatch(packagesActions.setPackagesOutdated(packages)),
    setTotalInstalled: (total) => dispatch(packagesActions.setTotalInstalled(total)),
    addMessage: (level, message) => dispatch(globalActions.addMessage(level, message)),
    clearMessages: () => dispatch(globalActions.clearMessages()),
    setActiveSidebarTab: (value) => dispatch(globalActions.setActiveSidebarTab(value))
  };
}

const _withStyles = withStyles(styles)(SidebarContainer);
export default connect(mapStateToProps, mapDispatchToProps)(_withStyles);
