/**
 * PackageCard component
 */

import { withStyles } from "material-ui/styles";
import {
  APP_MODES,
  APP_ACTIONS,
  PACKAGE_GROUPS,
  APP_INFO
} from "constants/AppConstants";
import { contains } from "ramda";
import packageCardStyles from "styles/packageCardStyles";
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Card from "material-ui/Card";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import CardActions from "./CardActions";
import CardDetails from "./CardDetails";
import Collapse from "material-ui/transitions/Collapse";
import Typography from "material-ui/Typography";
const { object, string } = PropTypes;

class PackageCard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {
      expanded,
      packageJSON,
      active,
      mode,
      setPackageGroup,
      clearCommandOptions,
      addCommandOption,
      toggleExpanded
    } = this.props;

    clearCommandOptions();

    if (mode === APP_MODES.LOCAL && active) {
      let found = false;

      Object.keys(PACKAGE_GROUPS).some((groupName, idx) => {
        found =
          packageJSON[groupName] && packageJSON[groupName][active.name]
            ? groupName
            : false;
        if (found) {
          setPackageGroup(groupName);
          return found;
        }
      });

      //save-exact fix
      const { group } = this.props;
      const symbols = ["~", "^"];

      if (group) {
        const pkgVersion = packageJSON[group][active.name];
        if (pkgVersion && !contains(pkgVersion[0], symbols)) {
          addCommandOption("save-exact");
        }
      }
    }
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
          <CardHeader active={active} mode={mode} group={group} />
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
            <CardDetails active={active} />
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
