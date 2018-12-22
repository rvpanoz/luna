/* eslint-disable */

/**
 * Toolbar
 */

import React, { useState } from 'react';
import cn from 'classnames';
import { useDispatch } from 'redux-react-hook';
import { remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadIcon from '@material-ui/icons/Archive';
import PublicIcon from '@material-ui/icons/PublicRounded';
import TableFilters from './TableFilters';
import { setMode } from '../../models/ui/actions';
import { APP_MODES } from '../../constants/AppConstants';

import { tableToolbarStyles as styles } from './styles';
import { Table } from '@material-ui/core';

const TableListToolbar = props => {
  const { classes, selected, title, directory, mode, reload } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtersOn, toggleFilters] = useState(false);
  const dispatch = useDispatch();

  const switchMode = (mode, directory) => {
    dispatch(setMode({ mode, directory }));
    reload();
  };

  const openFilters = e => {
    setAnchorEl(e.target);
    toggleFilters(!filtersOn);
  };

  const openPackage = () => {
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        title: 'Open package.json file',
        buttonLabel: 'Analyze',
        filters: [
          {
            name: 'package.json',
            extensions: ['json']
          }
        ],
        properties: ['openFile']
      },
      filePath => {
        if (filePath) {
          const directory = filePath.join('');
          switchMode(APP_MODES.LOCAL, directory);
        }
      }
    );
  };

  return (
    <section className={classes.root}>
      <Toolbar
        disableGutters={true}
        className={cn({
          [classes.highlight]: selected.length > 0
        })}
      >
        <div className={classes.header}>
          {selected && selected.length > 0 ? (
            <Typography color="primary" component="h1" variant="title">
              {selected.length} selected
            </Typography>
          ) : (
            <div className={classes.title}>
              <Typography color="primary" component="h1" variant="title">
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
        <div className={classes.filters}>
          <Popover
            open={filtersOn}
            anchorEl={anchorEl}
            onClose={e => toggleFilters(!filtersOn)}
          >
            <TableFilters mode={mode} />
          </Popover>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {selected.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Tooltip title="Open package.json">
                <IconButton
                  color="secondary"
                  aria-label="Open package.json"
                  onClick={e => openPackage()}
                >
                  <LoadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Show global packages">
                <IconButton
                  aria-label="Show globals"
                  onClick={e => switchMode(APP_MODES.GLOBAL, null)}
                >
                  <PublicIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reload list">
                <IconButton aria-label="Reload list" onClick={reload}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Show filters">
                <IconButton aria-label="Show filters" onClick={openFilters}>
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
