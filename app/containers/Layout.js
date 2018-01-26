import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import AppHeader from "../components/AppHeader";
import Typography from "material-ui/Typography";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";

import PackagesContainer from "./Packages";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    width: "100%",
    height: 430,
    zIndex: 1,
    overflow: "hidden"
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%"
  },
  appBar: {
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  content: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    marginLeft: 50,
    height: "calc(100% - 56px)",
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64
    }
  }
});

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, theme, open } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppHeader theme={theme} title="Luna" />
          <main className={classes.content}>
            <PackagesContainer />
          </main>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Layout);
