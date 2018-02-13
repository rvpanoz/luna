import { withStyles } from "material-ui/styles";
import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import AnalyzeIcon from "material-ui-icons/Code";
import Icon from "material-ui/Icon";
import RefreshIcon from "material-ui-icons/Refresh";
import SettingsIcon from "material-ui-icons/Settings";
import SearchBox from "components/header/SearchBox";
import Divider from "material-ui/Divider";

const styles = (theme) => ({
  root: {
    width: "100%"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    margin: theme.spacing.unit
  }
});

class AppBar extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div>
          <Button variant="fab" color="primary" aria-label="analyze" className={classes.button}>
            Analyze
            <AnalyzeIcon />
          </Button>
          <Button variant="fab" color="accent" aria-label="reload" className={classes.button}>
            Reload
            <RefreshIcon />
          </Button>
          <Button variant="fab" aria-label="settings" color="default" className={classes.button}>
            Settings
            <SettingsIcon />
          </Button>
          <Button variant="fab" aria-label="switch" className={classes.button}>
            Show globals
          </Button>
        </div>
        <SearchBox />
        <Divider />
      </div>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppBar);
