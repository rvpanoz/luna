/**
 * Package container
 * */

import { connect } from "react-redux";
import { compose } from "redux";
import { packageCardStyles } from "styles/packageCardStyles";
import { withStyles } from "material-ui/styles";
import * as globalActions from "actions/globalActions";
import * as packagesActions from "actions/packagesActions";
import { showMessageBox, triggerEvent, autoBind } from "utils";
import { contains } from "ramda";
import { APP_MODES, APP_ACTIONS, PACKAGE_GROUPS } from "constants/AppConstants";
import Chip from "material-ui/Chip";
import classnames from "classnames";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import React from "react";
import Divider from "material-ui/Divider";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import PackageCard from "components/package/PackageCard";
import PackageActions from "components/package/PackageActions";
import Fade from "material-ui/transitions/Fade";
import BarGraph from "components/package/BarGraph";
import Loader from "common/Loader";

class PackageContainer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(["onChangeVersion", "onExpandClick"], this);
  }
  componentWillUnmount() {
    const { expanded, toggleExpanded } = this.props;

    if (expanded) {
      toggleExpanded();
    }
  }
  onChangeVersion(e, value) {
    const {
      active,
      mode,
      directory,
      toggleMainLoader,
      setVersion
    } = this.props;

    const version = (e.target && e.target.value) || value;

    if (version && version !== "false") {
      toggleMainLoader(true);
      setVersion(version);
      triggerEvent("view-package", {
        mode,
        directory,
        cmd: ["view"],
        pkgName: active.name,
        pkgVersion: version,
        repo: active.repository || null
      });
    }
    return false;
  }
  render() {
    const {
      active,
      classes,
      isLoading,
      loading,
      setupSnackbar,
      toggleSnackbar,
      ...rest
    } = this.props;
    const error = active && active.error;

    // toggleSnackbar(false);
    //
    // if (error) {
    //   setupSnackbar({
    //     actionText: "close",
    //     loader: false,
    //     message: error.detail,
    //     position: {
    //       vertical: "bottom",
    //       horizontal: "center"
    //     }
    //   });
    //   toggleSnackbar(true);
    // }

    return (
      <Loader loading={isLoading}>
        {active ? (
          <section className={classes.root}>
            <Grid container direction="row" justify="flex-start">
              <Grid item xs={9}>
                <PackageCard
                  active={active}
                  onChangeVersion={this.onChangeVersion}
                  loading={loading}
                  isLoading={isLoading}
                  {...rest}
                />
              </Grid>
              <Grid item xs={3}>
                <PackageActions
                  active={active}
                  onChangeVersion={this.onChangeVersion}
                  {...rest}
                />
              </Grid>
            </Grid>
          </section>
        ) : null}
      </Loader>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory,
    packageJSON: state.global.packageJSON,
    toggleModal: state.global.toggleModal,
    showModal: state.global.showModal,
    npmCmd: state.global.npmCmd,
    cmdOptions: state.packages.cmdOptions,
    group: state.packages.group,
    expanded: state.packages.expanded,
    tabIndex: state.packages.tabIndex,
    version: state.packages.version,
    actions: state.packages.actions,
    defaultActions: state.packages.defaultActions,
    active: state.packages.active,
    isLoading: state.packages.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSnackbar: bool => dispatch(globalActions.toggleSnackbar(bool)),
    setupSnackbar: snackbarOptions =>
      dispatch(globalActions.setupSnackbar(snackbarOptions)),
    toggleSnackbar: bool => dispatch(globalActions.toggleSnackbar(bool)),
    addCommandOption: option =>
      dispatch(packagesActions.addCommandOption(option)),
    setActiveTab: tabIndex => dispatch(packagesActions.setActiveTab(tabIndex)),
    toggleExpanded: value => dispatch(packagesActions.toggleExpanded(value)),
    setPackageGroup: group => dispatch(packagesActions.setPackageGroup(group)),
    removeCommandOption: option =>
      dispatch(packagesActions.removeCommandOption(option)),
    clearCommandOptions: () => dispatch(packagesActions.clearCommandOptions()),
    toggleMainLoader: bool => dispatch(packagesActions.toggleMainLoader(bool)),
    toggleLoader: bool => dispatch(globalActions.toggleLoader(bool)),
    setActive: pkg => dispatch(packagesActions.setActive(pkg)),
    setVersion: version => dispatch(packagesActions.setVersion(version)),
    toggleModal: (bool, npmCmd) =>
      dispatch(globalActions.toggleModal(bool, npmCmd))
  };
}

export default compose(
  withStyles(packageCardStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(PackageContainer);
