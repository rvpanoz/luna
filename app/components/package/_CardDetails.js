/**
 * Card details component
 **/

import { withStyles } from "material-ui/styles";
import { APP_INFO } from "constants/AppConstants";
import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import classnames from "classnames";

const styles = theme => {
  return {
    column: {
      flexBasis: "33.33%"
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    }
  };
};

class CardDetails extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const { active, classes } = this.props;

    return (
      <div className={classnames(classes.column, classes.helper)}>
        <Typography variant="caption" gutterBottom>
          README: {active.readmeFilename || APP_INFO.NOT_AVAILABLE}
        </Typography>
        <Typography variant="caption" gutterBottom>
          main: {active.main || APP_INFO.NOT_AVAILABLE}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(CardDetails);
