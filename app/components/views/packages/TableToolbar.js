/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable compat/compat */
/* eslint-disable object-shorthand */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */

import { remote } from 'electron';
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

import ClearIcon from '@material-ui/icons/Clear';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SwitchIcon from '@material-ui/icons/LoopOutlined';

import { PACKAGE_GROUPS } from 'constants/AppConstants';
import { switchcase, iMessage } from 'commons/utils';
import {
  uninstallPackages,
  updatePackages,
  installMultiplePackages
} from 'models/packages/actions';
import { clearFilters } from 'models/ui/actions';

import TableFilters from './TableFilters';
import styles from './styles/tableToolbar';

const TableListToolbar = ({
  classes,
  selected,
  title,
  mode,
  toggleOptions,
  fromSearch,
  filters,
  reload,
  nodata,
  outdated,
  setFilteredByNamePackages,
  filteredByNamePackages,
  scrollWrapper,
  switchMode,
  total,
  packagesData
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtersOn, toggleFilters] = useState(false);

  const dispatch = useDispatch();
  const packagesOutdatedNames = outdated && outdated.map(pkg => pkg.name);

  const openFilters = (e, close) => {
    setAnchorEl(close ? null : e.target);
    toggleFilters(!filtersOn);
    scrollWrapper(0);
  };

  const clearAllFilters = () => {
    if (filteredByNamePackages.length) {
      setFilteredByNamePackages([]);
    }

    dispatch(clearFilters());
  };

  const handleAction = (action, force, latest) => {
    if (action === 'clearFilters') {
      return clearAllFilters();
    }

    if (!selected.length) {
      return;
    }

    if (mode === 'local' && action === 'install' && !force) {
      return toggleOptions({
        open: true,
        single: false
      });
    }

    if (action === 'install') {
      const pkgOptions =
        mode === 'local'
          ? selected.map(packageName => {
              const packageDetails = packagesData.find(
                packageDataDetails => packageDataDetails.name === packageName
              );
              const { __group } = packageDetails;

              return [PACKAGE_GROUPS[__group]];
            })
          : [];

      return dispatch(
        installMultiplePackages({
          ipcEvent: 'npm-install',
          cmd: selected.map(() => 'install'),
          multiple: true,
          pkgOptions,
          packages: latest
            ? selected.map(selectedPackage => `${selectedPackage}@latest`)
            : selected
        })
      );
    }

    if (action === 'uninstall') {
      return dispatch(
        uninstallPackages({
          ipcEvent: 'npm-uninstall',
          cmd: ['uninstall'],
          multiple: true,
          packages: selected
        })
      );
    }

    if (action === 'update') {
      return dispatch(
        updatePackages({
          ipcEvent: 'npm-update',
          cmd: ['update'],
          multiple: true,
          packages: selected
        })
      );
    }

    return false;
  };

  const renderAction = action => {
    const hasNpmSelected = selected && selected.indexOf('npm') > -1;

    const actionEl = switchcase({
      clearFilters: () => (
        <Tooltip title={iMessage('title', 'clearFilters')}>
          <IconButton
            color="secondary"
            aria-label="clear_filters"
            onClick={() => handleAction('clearFilters')}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      ),
      install: () => (
        <Tooltip title={iMessage('title', 'installSelected')}>
          <IconButton
            color="primary"
            aria-label="install-selected"
            onClick={() =>
              remote.dialog.showMessageBox(
                remote.getCurrentWindow(),
                {
                  title: 'Install packages',
                  type: 'question',
                  message: `\nDo you want to install the selected packages?`,
                  buttons: ['Cancel', 'Install']
                },
                btnIdx => {
                  if (Boolean(btnIdx) === true) {
                    handleAction('install');
                  }
                }
              )
            }
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      ),
      latest: () => (
        <Tooltip title={iMessage('title', 'installLatest')}>
          <IconButton
            color="primary"
            aria-label="install-latest"
            onClick={() =>
              remote.dialog.showMessageBox(
                remote.getCurrentWindow(),
                {
                  title: iMessage('title', 'installLatest'),
                  type: 'question',
                  message: iMessage('confirmation', 'installLatestSelected'),
                  buttons: ['Cancel', 'Install']
                },
                btnIdx => {
                  if (Boolean(btnIdx) === true) {
                    handleAction('install', true, true);
                  }
                }
              )
            }
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      ),
      update: () => (
        <Tooltip title={iMessage('title', 'updateSelected')}>
          <IconButton
            color="primary"
            aria-label="update-selected"
            onClick={() =>
              remote.dialog.showMessageBox(
                remote.getCurrentWindow(),
                {
                  title: iMessage('title', 'updateSelected'),
                  type: 'question',
                  message: iMessage('confirmation', 'updateSelected'),
                  buttons: ['Cancel', 'Update']
                },
                btnIdx => {
                  if (Boolean(btnIdx) === true) {
                    handleAction('update');
                  }
                }
              )
            }
          >
            <UpdateIcon />
          </IconButton>
        </Tooltip>
      ),
      uninstall: () => {
        const hasOneSelected = selected && selected.length === 1;

        return hasOneSelected && hasNpmSelected ? null : (
          <Tooltip title={iMessage('title', 'uninstallSelected')}>
            <IconButton
              color="secondary"
              aria-label="uninstall-selected"
              onClick={() =>
                remote.dialog.showMessageBox(
                  remote.getCurrentWindow(),
                  {
                    title: iMessage('title', 'uninstallSelected'),
                    type: 'question',
                    message: iMessage('confirmation', 'uninstallSelected'),
                    buttons: ['Cancel', 'Uninstall']
                  },
                  btnIdx => {
                    if (Boolean(btnIdx) === true) {
                      handleAction('uninstall');
                    }
                  }
                )
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        );
      },
      filters: () => (
        <Tooltip title={iMessage('title', 'showFilters')}>
          <div>
            <IconButton
              disableRipple
              disabled={nodata || fromSearch}
              aria-label="show-filters"
              onClick={openFilters}
            >
              <FilterListIcon />
            </IconButton>
          </div>
        </Tooltip>
      )
    })('none')(action);

    return actionEl;
  };

  const renderToolbarActions = () => (
    <React.Fragment>
      <Tooltip title={iMessage('title', 'switchGlobals')}>
        <div>
          <IconButton
            disableRipple
            disabled={mode === 'global'}
            aria-label="show-globals"
            onClick={() => switchMode('global', null)}
          >
            <SwitchIcon />
          </IconButton>
        </div>
      </Tooltip>
      {!fromSearch && total ? (
        <Tooltip title={iMessage('title', 'showFilters')}>
          <div>
            <IconButton
              disableRipple
              disabled={nodata || fromSearch}
              aria-label="show_filters"
              onClick={openFilters}
            >
              <FilterListIcon />
            </IconButton>
          </div>
        </Tooltip>
      ) : null}
      {total ? (
        <Tooltip title={fromSearch ? 'Back to list' : 'Reload list'}>
          <div>
            <IconButton
              disableRipple
              aria-label="back_reload"
              onClick={() => reload()}
            >
              <RefreshIcon />
            </IconButton>
          </div>
        </Tooltip>
      ) : null}
    </React.Fragment>
  );

  const hasUpdatedPackages = useCallback(
    selected.length &&
      selected.some(
        packageSelected => packagesOutdatedNames.indexOf(packageSelected) !== -1
      ),
    [selected]
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
          <Typography variant="h6" className={classes.title}>
            {selected && selected.length === 0
              ? `${title} ${total}`
              : `${selected.length} package(s) selected`}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={cn(classes.actions)}>
          {selected.length === 0 && renderToolbarActions()}
          {fromSearch && selected.length ? renderAction('install') : null}
          {!fromSearch && hasUpdatedPackages && selected.length
            ? renderAction('latest')
            : null}
          {!fromSearch && hasUpdatedPackages ? renderAction('update') : null}
          {!fromSearch && selected.length ? renderAction('uninstall') : null}
          {(filters && filters.length) || filteredByNamePackages.length
            ? selected.length
              ? null
              : renderAction('clearFilters')
            : null}
        </div>
      </Toolbar>
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
        <TableFilters
          mode={mode}
          close={() => openFilters(null, true)}
          listFilters={filters}
          clearAllFilters={clearAllFilters}
        />
      </Popover>
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
  filters: PropTypes.arrayOf(PropTypes.object),
  fromSearch: PropTypes.bool,
  total: PropTypes.number,
  scrollWrapper: PropTypes.func,
  outdated: PropTypes.arrayOf(PropTypes.object),
  packagesData: PropTypes.arrayOf(PropTypes.object),
  filteredByNamePackages: PropTypes.arrayOf(PropTypes.object),
  setFilteredByNamePackages: PropTypes.func,
  switchMode: PropTypes.func.isRequired,
  toggleOptions: PropTypes.func.isRequired
};

export default withStyles(styles)(TableListToolbar);
