/* eslint-disable */

/**
 * Toolbar
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';

import { tableToolbarStyles as styles } from './styles';

const TableListToolbar = props => {
  const { classes, selected, title, directory, mode } = props;

  return (
    <section className={classes.root}>
      <Toolbar>
        <div className={classes.header}>
          {selected && selected.length > 0 ? (
            <Typography
              color="secondary"
              component="h1"
              className={classes.headline}
            >
              {selected.length} selected
            </Typography>
          ) : (
            <div className={classes.title}>
              <Typography color="secondary" component="h1">
                {title}
              </Typography>
              {directory ? (
                <Typography
                  className={classes.directory}
                  variant="headline"
                  component="h5"
                >
                  {directory}
                </Typography>
              ) : null}
            </div>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {selected.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Tooltip title="Reload list">
                <IconButton aria-label="Reload list">
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Show filters">
                <IconButton aria-label="Show filters">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <Tooltip title="Uninstall selected">
              <IconButton aria-label="uninstall selected">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    </section>
  );
};

TableListToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableListToolbar);
