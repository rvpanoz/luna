/**
 * PackageActions component
 */

import { packageCardStyles } from "styles/packageCardStyles";
import { withStyles } from "material-ui/styles";
import { APP_MODES } from "constants/AppConstants";
import Card, { CardContent } from "material-ui/Card";
import React from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import CardVersions from "./CardVersions";
import CardOptions from "./CardOptions";
import CardTags from "./CardTags";
import Divider from "material-ui/Divider";

const grayColor = "#999999";
const { object, array, func, string } = PropTypes;

const styles = theme => {
  return {
    heading: {
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: "1.1rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    controls: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      marginTop: theme.spacing.unit,
      "& fieldset": {
        margin: theme.spacing.unit
      }
    },
    details: {
      marginBottom: 10
    },
    info: {
      lineHeight: "22px",
      color: grayColor,
      fontSize: "12px",
      display: "inline-block",
      margin: "0!important"
    }
  };
};

class PackageActions extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      active,
      addCommandOption,
      classes,
      group,
      mode,
      packageJSON,
      removeCommandOption,
      cmdOptions,
      onChangeVersion
    } = this.props;

    return (
      <section className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              component="h3"
              className={classes.heading}
              variant="subheading"
            >
              Versions and options
            </Typography>
            <Divider />
            <section className={classes.controls}>
              <CardVersions active={active} onChangeVersion={onChangeVersion} />
              {mode && mode === APP_MODES.LOCAL ? (
                <CardOptions
                  active={active}
                  addCommandOption={addCommandOption}
                  group={group}
                  cmdOptions={cmdOptions}
                  packageJSON={packageJSON}
                  removeCommandOption={removeCommandOption}
                />
              ) : null}
              <br />
              <CardTags active={active} />
            </section>
          </CardContent>
        </Card>
      </section>
    );
  }
}

export default withStyles(styles)(PackageActions);
