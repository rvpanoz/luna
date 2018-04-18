/**
 * SearchBox component
 */

import { withStyles } from "material-ui/styles";
import { triggerEvent } from "utils";
import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";

const { object } = PropTypes;

const styles = theme => {
  return {
    root: {
      margin: "0 10px",
      padding: 0
    },
    searchBoxLabel: {
      color: "#fff"
    },
    searchBoxInput: {
      width: 200,
      color: "#fff",
      "&:hover": {
        borderColor: "#fff"
      }
    }
  };
};

class SearchBox extends React.Component {
  constructor() {
    super();
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onKeyUp(e) {
    const el = e.target;
    const key = e.which || e.keyCode || 0;

    if (key === 13) {
      this.handleChange(e);
    }
    return false;
  }
  componentDidMount() {
    const root = this.refs.root;
    if (root) {
      root.addEventListener("keypress", this.onKeyUp);
    }
  }
  handleChange(e) {
    if (e) {
      e.preventDefault();
    }
    const {
      toggleLoader,
      setActive,
      mode,
      directory,
      setPackageActions
    } = this.props;
    const pkgName = e.target.value;

    if (pkgName) {
      toggleLoader(true);
      setActive(null);
      setPackageActions([
        {
          text: "Install",
          iconCls: "install",
          color: "primary"
        }
      ]);

      triggerEvent("search-packages", {
        cmd: ["search"],
        pkgName,
        mode,
        directory
      });
    }
    return false;
  }
  render() {
    const value = this.state;
    const { classes } = this.props;

    return (
      <div ref="root" className={classes.root}>
        <TextField
          id="search"
          type="search"
          label="Search npm"
          InputLabelProps={{ className: classes.searchBoxLabel }}
          inputProps={{ className: classes.searchBoxInput }}
        />
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(SearchBox);
