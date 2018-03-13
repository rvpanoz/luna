/**
 * CardActions component
 *
 */

import { APP_ACTIONS, APP_MODES } from "constants/AppConstants";
import { triggerEvent, showMessageBox } from "utils";
import { CardActions as MuiCardActions } from "material-ui/Card";
import React from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";
import classnames from "classnames";
import Button from "material-ui/Button";

const { object, func, bool, array } = PropTypes;

class CardActions extends React.Component {
  constructor() {
    super();
    this.doAction = this.doAction.bind(this);
  }
  doAction(e) {
    e.preventDefault();

    const target = e.currentTarget;
    const action = target.textContent.trim().toLowerCase();
    const {
      actions,
      mode,
      directory,
      version,
      active,
      toggleLoader,
      cmdOptions,
      setActive,
      setupSnackbar,
      toggleSnackbar
    } = this.props;

    if (!action || ["install", "uninstall", "update"].indexOf(action) === -1) {
      throw new Error(`doAction: action ${action} is invalid`);
    }

    showMessageBox(
      {
        action: action,
        name: active.name,
        version: action === "uninstall" ? null : version
      },
      () => {
        setActive(null);
        toggleLoader(true);
        triggerEvent(action, {
          mode,
          directory,
          cmd: [action === "update" ? "install" : action],
          pkgName: active.name,
          pkgVersion: action === "uninstall" ? null : version,
          pkgOptions: cmdOptions
        });
      }
    );

    return false;
  }
  render() {
    const { classes, actions, defaultActions, expanded, handleExpandClick } = this.props;

    return (
      <MuiCardActions className={classes.actions}>
        {actions &&
          actions.map((action, idx) => {
            return (
              <Button
                ref={action.text}
                key={idx}
                action={action.text}
                onClick={this.doAction}
                color={action.color}
                aria-label={action.text}
                className={classes.button}
              >
                {action.text}
              </Button>
            );
          })}
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </MuiCardActions>
    );
  }
}

CardActions.propTypes = {
  active: object.isRequired,
  classes: object.isRequired,
  handleExpandClick: func.isRequired,
  setActive: func.isRequired,
  actions: array.isRequired,
  defaultActions: array.isRequired,
  expanded: bool.isRequired
};

export default CardActions;
