/**
 * Sidebar container
 **/

"use strict";

import { remote, ipcRenderer } from "electron";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { APP_MODES, QUICKMENU } from "../constants/AppConstants";
import * as globalActions from "../actions/global_actions";
import * as packagesActions from "../actions/packages_actions";

import QuickMenu from "../components/sidebar/QuickMenu";
import AnalyzeSection from "../components/sidebar/AnalyzeSection";
import Settings from "../components/sidebar/Settings";
import OutdatedList from "../components/sidebar/OutdatedList";

class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this._updateMode = this._updateMode.bind(this);
    this.handleSidebarContent = this.handleSidebarContent.bind(this);
    this.openPackage = this.openPackage.bind(this);
  }
  _updateMode(directory) {
    this.props.setMode(APP_MODES.LOCAL, directory);
    this.props.setActive(null);
    ipcRenderer.send("analyze-json", directory);
  }
  handleSidebarContent(idx) {
    let sidebarContent = this.refs.sidebarContent;
    let menus = sidebarContent.querySelectorAll(".sidebar__menu");

    for (let i = 0; i < menus.length; i++) {
      menus[i].classList.remove("active");
    }

    if (menus && menus[idx]) {
      menus[idx].classList.add("active");
      menus[0].style["margin-left"] = "-" + idx * menus[idx].offsetWidth + "px";
    }
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
          this._updateMode(filePath[0]);
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
      mode
    } = this.props;
    const items = QUICKMENU.ICONS;

    return (
      <div className="sidebar">
        <QuickMenu
          items={items}
          packagesOutdated={packagesOutdated}
          handleSidebarContent={this.handleSidebarContent}
        />
        <div className="scroll-wrapper scrollable" style={{ position: "relative" }}>
          <div className="scrollable scroll-content">
            <div className="sidebar__cont" ref="sidebarContent">
              <div className="sidebar__menu active">
                <AnalyzeSection openPackage={this.openPackage} {...this.props} />
              </div>
              <div className="sidebar__menu">
                <OutdatedList
                  mode={mode}
                  packagesOutdated={packagesOutdated}
                  toggleMainLoader={toggleMainLoader}
                  setActive={setActive}
                />
              </div>
              <div className="sidebar__menu">
                <Settings
                  mode={mode}
                  setMode={setMode}
                  toggleLoader={toggleLoader}
                  setActive={setActive}
                  clearMessages={clearMessages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory,
    messages: state.global.messages,
    packages: state.packages.packages,
    packagesInstalled: state.packages.total,
    packagesOutdated: state.packages.outdated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPackages: (packages) => {
      return dispatch(packagesActions.setPackages(packages));
    },
    setPackageActions: (actions) => {
      return dispatch(packagesActions.setPackageActions(actions));
    },
    setPackageJSON: (content) => {
      return dispatch(globalActions.setPackageJSON(content));
    },
    setActive: (pkg) => {
      return dispatch(packagesActions.setActive(pkg));
    },
    toggleLoader: (bool) => {
      return dispatch(globalActions.toggleLoader(bool));
    },
    toggleMainLoader: (bool) => {
      return dispatch(packagesActions.toggleMainLoader(bool));
    },
    setMode: (mode, directory) => {
      return dispatch(globalActions.setMode(mode, directory));
    },
    setPackagesOutdated: (packages) => {
      return dispatch(packagesActions.setPackagesOutdated(packages));
    },
    setTotalInstalled: (total) => {
      return dispatch(packagesActions.setTotalInstalled(total));
    },
    addMessage: (level, message) => {
      return dispatch(globalActions.addMessage(level, message));
    },
    clearMessages: () => {
      return dispatch(globalActions.clearMessages());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
