/**
 * Base Layout
 */

"use strict";

import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";

const styles = (theme) => {
  return {
    root: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column"
    }
  };
};

class Layout extends React.Component {
  static AppHeader = null;
  constructor(props) {
    super(props);
    this.getElementByPosition = this.getElementByPosition.bind(this);
  }
  getElementByPosition(position) {
    const { children } = this.props;
    const isChildrenArray = Array.isArray(children);

    return R.filter(
      R.where({
        props: R.propOr({
          position: R.propEq("position", position)
        })
      })
    )(children);
  }
  componentWillMount() {
    this.AppHeader = this.getElementByPosition("header");
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>{this.AppHeader}</Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper className={classes.paper} />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper className={classes.paper} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(Layout);
