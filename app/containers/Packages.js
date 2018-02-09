/**
 * Packages Container Component - handles state.packages slice
 * pass state as props to children
 * */

import { remote, ipcRenderer } from "electron";
import { autoBind, parse } from "../utils";
import { connect } from "react-redux";
import { APP_MODES } from "constants/AppConstants";
import * as globalActions from "actions/globalActions";
import * as packagesActions from "actions/packagesActions";
import * as R from "ramda";
import React from "react";
import Grid from "material-ui/Grid";
import PackagesList from "../components/packages/PackagesList";
import PackageContainer from "./Package";

class PackagesContainer extends React.Component {
  constructor() {
    super();
    autoBind(["_setupPackages", "_setupOutdated", "_viewPackage", "_clearUI"], this);
  }
  componentDidMount() {
    const {
      setActive,
      toggleMainLoader,
      setMode,
      setTotal,
      setPackages,
      toggleLoader,
      setPackageJSON
    } = this.props;

    ipcRenderer.on("get-packages-close", (event, packages, command) => {
      if (!packages) {
        return;
      }

      if (command === "outdated") {
        this._setupOutdated(packages);
      } else {
        this._setupPackages(packages);
      }

      toggleLoader(false);
    });

    ipcRenderer.on("search-packages-close", (event, packagesStr) => {
      try {
        const packages = JSON.parse(packagesStr);
        setPackages(packages);
        setTotal(packages.length);
        toggleLoader(false);
      } catch (e) {
        throw new Error(e);
      }
    });

    ipcRenderer.on("view-package-close", (event, packageStr) => {
      try {
        const pkg = JSON.parse(packageStr);
        setActive(pkg);
        toggleMainLoader(false);
      } catch (e) {
        throw new Error(e);
      }
    });

    ipcRenderer.on("action-close", (event, pkg) => {
      const { mode, directory } = this.props;
      ipcRenderer.send("ipc-event", {
        ipcEvent: "get-packages",
        cmd: ["outdated", "list"],
        mode,
        directory
      });
    });

    ipcRenderer.on("ipcEvent-error", (event, error) => {
      // console.error(error)
    });

    ipcRenderer.on("analyze-json-close", (event, directory, content) => {
      toggleLoader(true);
      setMode(APP_MODES.LOCAL, directory);
      setActive(null);
      setPackageJSON(content);
      ipcRenderer.send("ipc-event", {
        ipcEvent: "get-packages",
        cmd: ["outdated", "list"],
        mode: APP_MODES.LOCAL,
        directory
      });
    });
  }
  _setupPackages(packages) {
    const { setPackages, packagesOutdated, setTotal, clearMessages } = this.props;

    const packagesData = parse(packages, "dependencies");
    const data = R.map((pkg) => {
      if (!pkg.from) return;
      const pkgName = R.split("@")(pkg.from)[0];
      const outdatedPackage = R.prop(pkgName, packagesOutdated);

      if (outdatedPackage && typeof outdatedPackage === "object") {
        return R.merge(pkg, {
          latest: outdatedPackage.latest
        });
      }
      return pkg;
    }, packagesData);

    // update state
    setPackages(data);
    setTotal(data.length);
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
    const { setActive, setPackageActions, toggleMainLoader, clearMessages } = this.props;

    setActive(null);
    clearMessages();
    setPackageActions();
    toggleMainLoader(false);
  }
  _setupOutdated(packages) {
    const { setPackagesOutdated } = this.props;
    try {
      const packagesOutdated = JSON.parse(packages);
      setPackagesOutdated(packagesOutdated);
    } catch (e) {
      throw new Error(e);
    }
  }
  componentWillUnmount() {
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
    const {
      mode,
      directory,
      packages,
      setActive,
      setMode,
      setPackages,
      toggleMainLoader
    } = this.props;

    return (
      <Grid container justify="space-between">
        <Grid item xs={3}>
          <PackagesList
            packages={packages}
            toggleMainLoader={toggleMainLoader}
            setMode={setMode}
            setActive={setActive}
            setPackages={setPackages}
          />
        </Grid>
        <Grid item xs={5}>
          <PackageContainer />
        </Grid>
        <Grid item xs={4} />
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
    packagesOutdated: state.packages.outdated,
    active: state.packages.active
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPackages: (packages) => dispatch(packagesActions.setPackages(packages)),
    setPackageActions: (actions) => dispatch(packagesActions.setPackageActions(actions)),
    setPackageJSON: (content) => dispatch(globalActions.setPackageJSON(content)),
    setActive: (active) => dispatch(packagesActions.setActive(active)),
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
