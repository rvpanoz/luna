/* eslint-disable */

/**
 * Toolbar
 */

import { ipcRenderer, remote } from 'electron';
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import InstallIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadIcon from '@material-ui/icons/Archive';
import PublicIcon from '@material-ui/icons/PublicRounded';

import { firstToUpper } from 'commons/utils';
import { APP_MODES } from 'constants/AppConstants';
import { setMode, toggleLoader } from 'models/ui/actions';
import { clearSelected } from 'models/packages/actions';
import TableFilters from './TableFilters';

import { tableToolbarStyles as styles } from '../styles/packagesStyles';

const TableListToolbar = props => {
  const {
    classes,
    selected,
    title,
    mode,
    manager,
    directory,
    fromSearch,
    reload,
    nodata
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [filtersOn, toggleFilters] = useState(false);

  const dispatch = useDispatch();

  const switchMode = (mode, directory) => {
    dispatch(setMode({ mode, directory }));

    if (fromSearch) {
      reload();
    }
  };

  const openFilters = (e, close) => {
    setAnchorEl(close ? null : e.target);
    toggleFilters(!filtersOn);
  };

  const doAction = action => {
    ipcRenderer.send('ipc-event', {
      activeManager: manager,
      ipcEvent: action,
      cmd: [action],
      multiple: true,
      packages: selected,
      mode,
      directory
    });

    dispatch(
      toggleLoader({
        loading: true,
        message: `${firstToUpper(action)}ing packages..`
      })
    );
  };

  const openPackage = useCallback(() => {
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

        return false;
      }
    );
  }, []);

  const handleAction = action => {
    if (selected && selected.length) {
      remote.dialog.showMessageBox(
        remote.getCurrentWindow(),
        {
          title: 'Confirmation',
          type: 'question',
          message: `Would you like to ${action} the selected packages?`,
          buttons: ['Cancel', firstToUpper(action)]
        },
        btnIdx => {
          if (Boolean(btnIdx) === true) {
            doAction(action);
          }
        }
      );
    }
    return false;
  };

  const renderToolbarActions = () => (
    <div className={classes.flexContainer}>
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
        <div>
          <IconButton
            disabled={mode === APP_MODES.GLOBAL && !fromSearch}
            aria-label="Show globals"
            onClick={e => switchMode(APP_MODES.GLOBAL, null)}
          >
            <PublicIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Tooltip title={fromSearch ? 'Back to list' : 'Reload list'}>
        <div>
          <IconButton
            aria-label={fromSearch ? 'Back to list' : 'Reload list'}
            onClick={() => reload()}
          >
            <RefreshIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Tooltip title="Show filters">
        <div>
          <IconButton
            disabled={nodata === true}
            aria-label="Show filters"
            onClick={openFilters}
          >
            <FilterListIcon />
          </IconButton>
        </div>
      </Tooltip>
    </div>
  );

  return (
    <section className={classes.root}>
      <Toolbar
        disableGutters={true}
        className={cn({
          [classes.highlight]: selected.length > 0
        })}
      >
        <div className={classes.header}>
          <Typography color="secondary" component="h1">
            {selected && selected.length === 0
              ? title
              : `${selected.length} selected`}
          </Typography>
        </div>
        <div className={classes.filters}>
          <Popover
            open={filtersOn}
            anchorEl={anchorEl}
            onClose={e => toggleFilters(!filtersOn)}
          >
            <TableFilters mode={mode} close={() => openFilters(null, true)} />
          </Popover>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {selected.length === 0 ? (
            renderToolbarActions()
          ) : fromSearch ? (
            <div className={classes.flexContainer}>
              <Tooltip title="Install selected">
                <IconButton
                  aria-label="install selected"
                  onClick={() => handleAction('install')}
                >
                  <InstallIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <div className={classes.flexContainer}>
              <Tooltip title="Clear selected">
                <IconButton
                  aria-label="clear selected"
                  onClick={() => dispatch(clearSelected())}
                >
                  <ClearAllIcon />
                </IconButton>
              </Tooltip>
              {!fromSearch && (
                <Tooltip title="Uninstall selected">
                  <IconButton
                    aria-label="uninstall selected"
                    onClick={() => handleAction('uninstall')}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </Toolbar>
    </section>
  );
};

TableListToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  reload: PropTypes.func.isRequired,
  nodata: PropTypes.bool
};

export default withStyles(styles)(TableListToolbar);
