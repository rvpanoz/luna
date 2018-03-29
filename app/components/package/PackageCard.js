/**
 * PackageCard component
 */

import { withStyles } from "material-ui/styles";
import packageCardStyles from "styles/packageCardStyles";
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Card from "material-ui/Card";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import CardActions from "./CardActions";
import Collapse from "material-ui/transitions/Collapse";
import Typography from "material-ui/Typography";

const { object, string } = PropTypes;

class PackageCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      active,
      classes,
      cmdOptions,
      mode,
      version,
      addCommandOption,
      removeCommandOption,
      clearCommandOptions,
      onChangeVersion,
      group,
      toggleExpanded,
      toggleLoader,
      expanded,
      defaultActions,
      setupSnackbar,
      toggleSnackbar,
      directory,
      actions,
      setActive,
      packageJSON
    } = this.props;

    return (
      <section className={classes.root}>
        <Card className={classes.card}>
          <CardHeader active={active} mode={mode} />
          <CardContent
            version={version}
            active={active}
            cmdOptions={cmdOptions}
            onChangeVersion={onChangeVersion}
            addCommandOption={addCommandOption}
            removeCommandOption={removeCommandOption}
            clearCommandOptions={clearCommandOptions}
            mode={mode}
            group={group}
            packageJSON={packageJSON}
          />
          <CardActions
            active={active}
            handleExpandClick={toggleExpanded}
            expanded={expanded}
            setActive={setActive}
            toggleLoader={toggleLoader}
            actions={actions}
            defaultActions={defaultActions}
            setupSnackbar={setupSnackbar}
            toggleSnackbar={toggleSnackbar}
            mode={mode}
            version={version}
            directory={directory}
            cmdOptions={cmdOptions}
          />
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            className={classes.collapseContent}
          >
            <div className={classnames(classes.column, classes.helper)}>
              <Typography
                variant="caption"
                className={classes.secondaryHeading}
              >
                Githead: {active.gitHead} <br />
                <a href="#sub-labels-and-columns" className={classes.link}>
                  Learn more
                </a>
              </Typography>
            </div>
          </Collapse>
        </Card>
      </section>
    );
  }
}

PackageCard.propTypes = {
  active: object.isRequired,
  classes: object.isRequired,
  mode: string.isRequired
};

export default withStyles(packageCardStyles)(PackageCard);
