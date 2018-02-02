/**
Layout component
**/

"use strict";

import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import * as globalActions from "../actions/global_actions";
import AppHeader from "../components/header/AppHeader";
import Grid from "material-ui/Grid";
import PackagesContainer from "./Packages";
import { layoutStyles } from "./styles";

class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { classes, theme, menuOpen, handleDrawerOpen, handleDrawerClose } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppHeader
            title="Eurobank"
            theme={theme}
            menuOpen={menuOpen}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          />
          <main className={classes.content}>
            <Grid container justify="space-between">
              <Grid item xs={12}>
                <PackagesContainer />
              </Grid>
            </Grid>
          </main>
        </div>
      </div>
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
