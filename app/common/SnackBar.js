/**
 * SnackBar
 *
 **/

import { withStyles } from "material-ui/styles";
import React from "react";
import PropTypes from "prop-types";
import Snackbar from "material-ui/Snackbar";
import Button from "material-ui/Button";

const styles = theme => {
  return {
    root: {
      marginTop: 5
    }
  };
};

const SnackbarAction = props => {
  const { action, actionText } = props;
  return (
    <Button color="primary" size="small" onClick={e => action()}>
      {actionText}
    </Button>
  );
};

const SnackBar = props => {
  const { classes, snackBarOpen, handleSnackBarClose, message } = props;

  return (
    <Snackbar
      className={classes.root}
      resumeHideDuration={5}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={snackBarOpen}
      onClose={handleSnackBarClose}
      SnackbarContentProps={{
        "aria-describedby": "message"
      }}
      message={
        <div className="saving">
          {message}
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      }
    />
  );
};

const { bool, func, string } = PropTypes;

SnackBar.propTypes = {
  snackBarOpen: bool.isRequired,
  message: string.isRequired
};

export default withStyles(styles)(SnackBar);
