/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable compat/compat */
/* eslint-disable object-shorthand */

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
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import ClearIcon from '@material-ui/icons/Clear';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadIcon from '@material-ui/icons/ArchiveOutlined';
import SwitchIcon from '@material-ui/icons/LoopOutlined';

import { switchcase } from 'commons/utils';
import { navigatorParameters } from 'commons/parameters';
import { INFO_MESSAGES } from 'constants/AppConstants';

import { updatePackages, installPackages } from 'models/packages/actions';
import { clearInstallOptions } from 'models/common/actions';
import { clearFilters } from 'models/ui/actions';

import TableFilters from './TableFilters';
import Flags from './Flags';
import styles from './styles/tableToolbar';

const TableListToolbar = ({
  classes,
  selected,
  title,
  mode,
  manager,
  directory,
  fromSearch,
  filters,
  reload,
  nodata,
  scrollWrapper,
  outdated,
  packagesInstallOptions,
  setFilteredByNamePackages,
  switchMode,
  filteredByNamePackages,
  total
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtersOn, toggleFilters] = useState(false);
  const [optionsOpen, toggleOptions] = useState(false);

  const dispatch = useDispatch();
  const packagesOutdatedNames = outdated && outdated.map(pkg => pkg.name);

  const openFilters = (e, close) => {
    setAnchorEl(close ? null : e.target);
    toggleFilters(!filtersOn);
    scrollWrapper(0);
  };

  const handleAction = (action, force) => {
    if (action === 'clearFilters') {
      if (filteredByNamePackages.length) {
        setFilteredByNamePackages([]);
      }

      return dispatch(clearFilters());
    }

    if (mode === 'local' && action === 'install' && !force) {
      return toggleOptions(true);
    }

    if (action === 'install' && selected.length) {
      const commands = selected.map(selectedPackage => {
        const selectedPackageOptions = packagesInstallOptions.find(
          option => option.name === selectedPackage
        );

        if (selectedPackageOptions) {
          const { name, options } = selectedPackageOptions;

          return {
            operation: action,
            package: name,
            options: options
          };
        }

        return {
          operation: action,
          package: selectedPackage,
          options: ['save-prod']
        };
      });

      const operations = commands.map(command => command.operation);
      const packages = commands.map(command => command.package);
      const pkgOptions = commands.map(command => command.options);

      const parameters = {
        activeManager: manager,
        ipcEvent: 'install',
        cmd: operations,
        packages,
        pkgOptions,
        multiple: true,
        mode,
        directory
      };

      dispatch(installPackages(parameters));
    } else {
      dispatch(
        updatePackages({
          activeManager: manager,
          ipcEvent: action,
          cmd: [action],
          multiple: true,
          packages: selected,
          mode,
          directory
        })
      );
    }
  };

  const openPackage = () =>
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      navigatorParameters,
      filePath => (filePath ? switchMode('local', filePath.join('')) : null)
    );

  const renderAction = action => {
    const hasNpmSelected = selected && selected.indexOf('npm') > -1;

    const actionEl = switchcase({
      clearFilters: () => (
        <Tooltip title="Clear filters">
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
        <Tooltip title="Install selected">
          <IconButton
            color="primary"
            aria-label="install_selected"
            onClick={() =>
              remote.dialog.showMessageBox(
                remote.getCurrentWindow(),
                {
                  title: 'Install packages',
                  type: 'question',
                  message: `Do you want to install the selected packages?`,
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
        <Tooltip title="Install latest">
          <IconButton
            color="primary"
            aria-label="install_latest"
            onClick={() =>
              remote.dialog.showMessageBox(
                remote.getCurrentWindow(),
                {
                  title: 'Install latest version',
                  type: 'question',
                  message: `Do you want to install the latest version of the selected packages?`,
                  buttons: ['Cancel', 'Install']
                },
                btnIdx => {
                  if (Boolean(btnIdx) === true) {
                    handleAction('install', true);
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
        <Tooltip title="Update selected">
          <IconButton
            color="primary"
            aria-label="update_selected"
            onClick={() =>
              remote.dialog.showMessageBox(
                remote.getCurrentWindow(),
                {
                  title: 'Update packages',
                  type: 'question',
                  message: `Do you want to update the selected packages?`,
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
          <Tooltip title="Uninstall selected">
            <IconButton
              color="secondary"
              aria-label="uninstall selected"
              onClick={() =>
                remote.dialog.showMessageBox(
                  remote.getCurrentWindow(),
                  {
                    title: 'Uninstall packages',
                    type: 'question',
                    message: `Do you want to uninstall the selected packages?`,
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
      )
    })('none')(action);

    return actionEl;
  };

  const renderToolbarActions = () => (
    <React.Fragment>
      <Tooltip title="Open package.json">
        <IconButton
          color="primary"
          disableRipple
          aria-label="open_package"
          onClick={openPackage}
        >
          <LoadIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Show global packages">
        <div>
          <IconButton
            disableRipple
            disabled={mode === 'global'}
            aria-label="show_globals"
            onClick={() => switchMode('global', null)}
          >
            <SwitchIcon />
          </IconButton>
        </div>
      </Tooltip>
      {!fromSearch && (
        <Tooltip title="Show filters">
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
      )}
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
              : `${selected.length} selected`}
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
        />
      </Popover>
      <Dialog
        open={optionsOpen}
        fullWidth
        onClose={() => {
          dispatch({ type: clearInstallOptions.type });
          toggleOptions(!optionsOpen);
        }}
        aria-labelledby="install-options"
      >
        <DialogTitle>Installation options</DialogTitle>
        <DialogContent>
          <DialogContentText>{INFO_MESSAGES.installing}</DialogContentText>
          <Flags selected={selected} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch({ type: clearInstallOptions.type });
              toggleOptions(false);
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleAction('install', true)}
            color="primary"
            autoFocus
          >
            Install
          </Button>
        </DialogActions>
      </Dialog>
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
  filters: PropTypes.arrayOf(PropTypes.object),
  fromSearch: PropTypes.bool,
  total: PropTypes.number,
  scrollWrapper: PropTypes.func,
  outdated: PropTypes.arrayOf(PropTypes.object),
  filteredByNamePackages: PropTypes.arrayOf(PropTypes.object),
  setFilteredByNamePackages: PropTypes.func,
  switchMode: PropTypes.func.isRequired,
  packagesInstallOptions: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(TableListToolbar);
