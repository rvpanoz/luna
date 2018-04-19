/**
 * Common Loader component
 */

import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";
import React from "react";

const styles = {
  root: {
    width: "100%",
    position: "fixed",
    top: "50%",
    left: "50%"
  }
};

const AppLoader = props => {
  const { loading, classes } = props;

  return loading ? (
    <CircularProgress className={classes.root} />
  ) : (
    props.children
  );
};

export default withStyles(styles)(AppLoader);
