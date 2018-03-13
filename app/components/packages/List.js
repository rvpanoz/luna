/**
 * PackagesList
 *
 */

import { withStyles } from "material-ui/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import Loader from "common/Loader";
import ListItem from "./ListItem";
import * as globalActions from "actions/globalActions";
import List from "material-ui/List";

const styles = (theme) => {
  return {
    flexRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start"
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start"
    },
    heading: {
      margin: "0.5em 0 1.0em",
      fontSize: "1.5rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.35417em"
    },
    avatar: {
      margin: "0.5em"
    },
    iconbutton: {
      position: "relative",
      top: "7px",
      marginLeft: "auto"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    lcontainer: {
      overflowY: "auto"
    },
    list: {
      visibility: "visible",
      overflowX: "hidden",
      overflowY: "auto",
      clear: "both",
      maxHeight: "750px"
    },
    directory: {
      fontSize: "0.9em",
      overflowWrap: "break-word",
      overflow: "hidden"
    }
  };
};

class PackagesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { packages, classes, loading, ...rest } = this.props;

    return (
      <Loader loading={loading}>
        <section className={classes.lcontainer}>
          <List className={classes.list}>
            {packages
              ? packages.map((pkg, idx) => {
                  if (!pkg) {
                    return;
                  }
                  const { hasPeerMissing, latest, version } = pkg;
                  if (hasPeerMissing) {
                    return;
                  }
                  const name = pkg.from ? pkg.from.split("@")[0] : pkg.name;

                  return (
                    <ListItem
                      description={pkg.description ? pkg.description : null}
                      key={idx}
                      name={name}
                      latest={latest}
                      version={version}
                      {...rest}
                    />
                  );
                })
              : null}
          </List>
        </section>
      </Loader>
    );
  }
}

const { array, object, string, func, bool } = PropTypes;

PackagesList.propTypes = {
  packages: array.isRequired,
  classes: object.isRequired,
  loading: bool.isRequired,
  mode: string.isRequired,
  toggleMainLoader: func.isRequired,
  toggleLoader: func.isRequired,
  directory: string
};

export default withStyles(styles)(PackagesList);
