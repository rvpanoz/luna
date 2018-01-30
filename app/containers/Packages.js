/**
 * Packages Container Component - handles state.packages slice
 * pass state as props to children
 **/

"use strict";

import { remote, ipcRenderer } from "electron";
import React from "react";
import { parse } from "../utils";
import * as R from "ramda";
import { connect } from "react-redux";
import { APP_MODES } from "../constants/AppConstants";
import * as globalActions from "../actions/global_actions";
import * as packagesActions from "../actions/packages_actions";
import Grid from "material-ui/Grid";
import PackagesList from "../components/packages/PackagesList";
import PackageContainer from "./Package";

class PackagesContainer extends React.Component {
  constructor() {
    super();
    this._outdated = [];
    this._autoBind([
      "fetch",
      "setGlobalMode",
      "_setupList",
      "_setupOutdated",
      "_viewPackage",
      "_clearUI"
    ]);
  }
  _autoBind(handlers) {
    R.forEach((handler) => {
      if (typeof this[handler] === "function") {
        this[handler] = this[handler].bind(this);
      }
    }, handlers);
  }
  _setupList(packages) {
    const outdated = this._outdated;
    const { setPackages, setTotal, clearMessages } = this.props;

    const data = R.map((pkg) => {
      if (!pkg.from) return;
      const pkgName = R.split("@")(pkg.from)[0];
      const outdatedPackage = R.prop(pkgName, outdated);

      if (outdatedPackage && typeof outdatedPackage === "object") {
        return R.merge(pkg, {
          latest: outdatedPackage.latest
        });
      } else {
        return pkg;
      }
    }, packages);

    //update state
    setPackages(data);
    setTotal(data.length);
    clearMessages();

    // TODO - setup notifications
    // let notifications = parse(packages, "problems");
    // notifications.forEach((notification, idx) => {
    //   this.props.addMessage("error", notification);
    // });
  }
  _viewPackage(name, version) {
    ipcRenderer.send("ipc-event", {
      ipcEvent: "view-package",
      cmd: ["view"],
      pkgName: name,
      pkgVersion: version,
      mode: this.props.mode,
      directory: this.props.directory
    });
  }
  _clearUI() {
    const { setActive, setPackageActions, toggleMainLoader, toggleModal } = this.props;

    setActive(null);
    setPackageActions();
    toggleMainLoader(false);
  }
  fetch() {
    const { mode, directory } = this.props;
    ipcRenderer.send("ipc-event", {
      ipcEvent: "get-packages",
      cmd: ["outdated", "list"],
      mode: mode || APP_MODES.GLOBAL,
      directory: directory
    });
  }
  componentDidMount() {
    const { setActive, toggleMainLoader, setMode, setPackages, toggleLoader } = this.props;

    ipcRenderer.on("get-packages-close", (event, packages, command) => {
      if (!packages) {
        return;
      }

      switch (command) {
        case "outdated":
          this._outdated = JSON.parse(packages);
          break;
        default:
          const data = parse(packages, "dependencies");
          this._setupList(data);
      }

      toggleLoader(false);
    });

    ipcRenderer.on("search-packages-close", (event, packagesStr) => {
      let packages = JSON.parse(packagesStr);
      setPackages(packages);
      toggleLoader(false);
    });

    ipcRenderer.on("view-package-close", (event, packageStr) => {
      let pkg;
      try {
        pkg = JSON.parse(packageStr);
      } catch (e) {
        console.error(e);
      }

      if (pkg) {
        setActive(pkg);
        toggleMainLoader(false);
      } else {
        throw new Error("Package cannot be parsed");
      }
    });

    ipcRenderer.on("action-close", (event, pkg) => {
      let mode = this.props.mode,
        directory = this.props.directory;
      if (mode === APP_MODES.LOCAL && directory) {
        ipcRenderer.send("analyze-json", directory);
        return;
      }
      this.loadData();
    });

    ipcRenderer.on("ipcEvent-error", (event, error) => {
      // console.error(error)
    });

    ipcRenderer.on("analyze-json-close", (event, directory, content) => {
      setMode(APP_MODES.LOCAL, directory);
      setActive(null);
      setPackageJSON(content);
      toggleLoader(true);
      this.fetch();
    });
  }
  componentWillUnMount() {
    ipcRenderer.removeAllListeners([
      "get-packages-close",
      "search-packages-close",
      "action-close",
      "view-package-reply",
      "ipcEvent-error",
      "analyze-json-close"
    ]);
  }
  render() {
    const { packages, setActive, setMode, toggleMainLoader } = this.props;

    return (
      <Grid container justify="space-between">
        <Grid item xs={5}>
          <PackagesList
            packages={packages}
            fetch={this.fetch}
            toggleMainLoader={toggleMainLoader}
            setMode={setMode}
          />
        </Grid>
        <Grid item xs={7}>
          <PackageContainer />
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory,
    showModal: state.global.showModal,
    packages: state.packages.packages,
    active: state.packages.active
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPackages: (packages) => dispatch(packagesActions.setPackages(packages)),
    setPackageActions: (actions) => dispatch(packagesActions.setPackageActions(actions)),
    setPackageJSON: (content) => dispatch(globalActions.setPackageJSON(content)),
    setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
    toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool)),
    toggleModal: (bool) => dispatch(globalActions.toggleModal(bool)),
    setTotal: (total) => dispatch(packagesActions.setTotal(total)),
    toggleMainLoader: (bool) => dispatch(packagesActions.toggleMainLoader(bool)),
    setMode: (mode, directory) => dispatch(globalActions.setMode(mode, directory)),
    setPackagesOutdated: (packages) => dispatch(packagesActions.setPackagesOutdated(packages)),
    addMessage: (level, message) => dispatch(globalActions.addMessage(level, message)),
    clearMessages: () => dispatch(globalActions.clearMessages())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer);
