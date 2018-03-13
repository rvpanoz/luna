/**
 * Card details content (expanded)
 **/

import { APP_INFO } from "constants/AppConstants";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemText } from "material-ui/List";
import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import Divider from "material-ui/Divider";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import PermIdentity from "material-ui-icons/PermIdentity";
import HomeIcon from "material-ui-icons/Home";
import RefreshIcon from "material-ui-icons/Refresh";
import VerifiedUserIcon from "material-ui-icons/VerifiedUser";
import BugReport from "material-ui-icons/BugReport";

const styles = (theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  inner: {
    display: "flex",
    flexDirection: "row"
  },
  flexItem: {
    flex: "auto"
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const CardInfo = (props) => {
  const { classes, active } = props;
  const dependencies = Object.keys(active.dependencies || {});
  const { latest, stable } = active["dist-tags"] || {};

  return (
    <section className={classes.root}>
      <div className={classes.inner}>
        <Typography className={classes.rawItem} variant="caption">
          {active.author}
        </Typography>
        <Avatar>
          <PermIdentity />
        </Avatar>
      </div>
    </section>
  );
};

const { object, array } = PropTypes;

CardInfo.propTypes = {
  classes: object.isRequired,
  active: object.isRequired
};

export default withStyles(styles)(CardInfo);
