/**
 * Layout component
 *
 */

import { remote, ipcRenderer } from "electron";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { layoutStyles } from "./styles";
import { APP_MODES } from "constants/AppConstants";
import * as globalActions from "actions/globalActions";
import * as packagesActions from "actions/packagesActions";
import Grid from "material-ui/Grid";
import React from "react";
import PropTypes from "prop-types";
import SnackBar from "common/SnackBar";
import PackagesContainer from "containers/Packages";
import AppHeader from "components/header/AppHeader";

class Layout extends React.Component {
  constructor() {
    super();
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
  }
  handleSnackBarClose() {
    const { toggleSnackbar } = this.props;
    toggleSnackbar(false);
  }
  render() {
    const {
      classes,
      mode,
      menuOpen,
      snackbar,
      snackBarOpen,
      handleDrawerOpen,
      handleDrawerClose,
      setMode
    } = this.props;

    return (
      <div className={classes.root}>
        <AppHeader
          menuOpen={menuOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <main className={classes.content}>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={9}>
              <PackagesContainer />
            </Grid>
            <Grid item xs={3} />
          </Grid>
          {snackBarOpen ? (
            <SnackBar
              snackBarOpen={snackBarOpen}
              handleSnackBarClose={this.handleSnackBarClose}
              actionText={snackbar.actionText}
              message={snackbar.message}
            />
          ) : null}
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    snackbar: state.global.snackbar,
    menuOpen: state.global.menuOpen,
    snackBarOpen: state.global.snackBarOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSnackbar: (bool) => dispatch(globalActions.toggleSnackbar(bool)),
    handleDrawerOpen: () => dispatch(globalActions.handleDrawer(true)),
    handleDrawerClose: () => dispatch(globalActions.handleDrawer(false))
  };
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default compose(
  withStyles(layoutStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Layout);
