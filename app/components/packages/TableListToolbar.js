/** Toolbar List component **/

import { withStyles } from "material-ui/styles";
import { toolbarStyles } from "./styles";
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import DeleteIcon from "material-ui-icons/Delete";
import RefreshIcon from "material-ui-icons/Refresh";
import ListIcon from "material-ui-icons/List";
import FilterListIcon from "material-ui-icons/FilterList";
import UpdateIcon from "material-ui-icons/Update";

const TableListToolbar = (props) => {
  const {
    classes,
    selected,
    title,
    loading,
    handleReload,
    handleGlobals,
    handleUninstall,
    handleUpdate,
    rowCount
  } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: selected && selected.length > 0
      })}
    >
      <div className={classes.title}>
        {loading ? (
          <div className="saving">
            Loading packages<span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        ) : selected && selected.length > 0 ? (
          <Typography color="inherit" variant="subheading">
             {selected.length} selected
          </Typography>
        ) : (
          <Typography variant="title">{title} {rowCount}</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      {loading ? null : (
        <div className={classes.actions}>
          {selected && selected.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip title="Uninstall selected">
                <IconButton aria-label="Uninstall-selected" onClick={handleUninstall}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Update all">
                <IconButton aria-label="Update-all" onClick={handleUpdate}>
                  <UpdateIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip title="Reload list">
                <IconButton aria-label="Reload list" onClick={handleReload}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Show globals">
                <IconButton aria-label="Show globals" onClick={handleGlobals}>
                  <ListIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      )}
    </Toolbar>
  );
};

TableListToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array
};

export default withStyles(toolbarStyles)(TableListToolbar);
