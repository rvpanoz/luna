/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */

import { ipcRenderer, remote } from 'electron';
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadIcon from '@material-ui/icons/Archive';
import PublicIcon from '@material-ui/icons/PublicRounded';

import { firstToUpper } from 'commons/utils';
import { APP_MODES, INFO_MESSAGES } from 'constants/AppConstants';
import { setMode, toggleLoader } from 'models/ui/actions';

import TableFilters from './TableFilters';

import { tableToolbarStyles as styles } from './styles/packagesStyles';

const TableListToolbar = ({
  classes,
  selected,
  title,
  mode,
  manager,
  directory,
  fromSearch,
  reload,
  nodata,
  scrollWrapper,
  packagesOutdatedNames
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtersOn, toggleFilters] = useState(false);

  const dispatch = useDispatch();

  const switchMode = useCallback(
    (appMode, appDirectory) => {
      dispatch(setMode({ mode: appMode, directory: appDirectory }));

      if (fromSearch) {
        reload();
      }
    },
    [mode, directory]
  );

  const needUpdate = selected.some(
    packageSelected => packagesOutdatedNames.indexOf(packageSelected) !== -1
  );

  const openFilters = useCallback(
    (e, close) => {
      setAnchorEl(close ? null : e.target);
      toggleFilters(!filtersOn);
      scrollWrapper(0);
    },
    [filtersOn]
  );

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
        message: INFO_MESSAGES.updating
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
          const scanDirectory = filePath.join('');
          switchMode(APP_MODES.LOCAL, scanDirectory);
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
          disableRipple
          color="secondary"
          aria-label="Open package.json"
          onClick={openPackage}
        >
          <LoadIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Show global packages">
        <div>
          <IconButton
            disableRipple
            disabled={mode === APP_MODES.GLOBAL && !fromSearch}
            aria-label="Show globals"
            onClick={() => switchMode(APP_MODES.GLOBAL, null)}
          >
            <PublicIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Tooltip title={fromSearch ? 'Back to list' : 'Reload list'}>
        <div>
          <IconButton disableRipple aria-label="back_reload" onClick={reload}>
            <RefreshIcon />
          </IconButton>
        </div>
      </Tooltip>
      {!fromSearch && (
        <Tooltip title="Show filters">
          <div>
            <IconButton
              disableRipple
              disabled={nodata || fromSearch}
              aria-label="Show filters"
              onClick={openFilters}
            >
              <FilterListIcon />
            </IconButton>
          </div>
        </Tooltip>
      )}
    </div>
  );

  return (
    <section className={classes.root}>
      <Toolbar
        disableGutters
        className={cn({
          [classes.highlight]: selected.length > 0
        })}
      >
        <div className={classes.header}>
          <Typography variant="subtitle1">
            {selected && selected.length === 0
              ? title
              : `${selected.length} selected`}
          </Typography>
        </div>
        <div className={classes.filters}>
          <Popover
            open={filtersOn}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right'
            }}
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
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <div className={classes.flexContainer}>
              {!fromSearch && selected.length && needUpdate && (
                <Tooltip title="Update selected">
                  <IconButton
                    aria-label="update selected"
                    onClick={() => handleAction('update')}
                  >
                    <UpdateIcon />
                  </IconButton>
                </Tooltip>
              )}
              {!fromSearch && selected.length && (
                <React.Fragment>
                  <Tooltip title="Install selected">
                    <IconButton
                      aria-label="install selected"
                      onClick={() => handleAction('install')}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Uninstall selected">
                    <IconButton
                      aria-label="uninstall selected"
                      onClick={() => handleAction('uninstall')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </React.Fragment>
              )}
            </div>
          )}
        </div>
      </Toolbar>
    </section>
  );
};

TableListToolbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  reload: PropTypes.func.isRequired,
  nodata: PropTypes.bool,
  selected: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  mode: PropTypes.string,
  manager: PropTypes.string,
  directory: PropTypes.string,
  fromSearch: PropTypes.bool,
  scrollWrapper: PropTypes.func,
  packagesOutdatedNames: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(TableListToolbar);
