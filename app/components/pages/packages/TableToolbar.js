/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable compat/compat */

import { remote } from 'electron';
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import { merge, pluck } from 'ramda';
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

import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadIcon from '@material-ui/icons/Archive';
import PublicIcon from '@material-ui/icons/BallotOutlined';

import { switchcase } from 'commons/utils';
import { INFO_MESSAGES, PACKAGE_GROUPS } from 'constants/AppConstants';
import { setMode } from 'models/ui/actions';
import { updatePackages, installPackages } from 'models/packages/actions';
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
  reload,
  nodata,
  scrollWrapper,
  outdated,
  packagesInstallOptions
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtersOn, toggleFilters] = useState(false);
  const [optionsOpen, toggleOptions] = useState(false);

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

  const openFilters = useCallback(
    (e, close) => {
      setAnchorEl(close ? null : e.target);
      toggleFilters(!filtersOn);
      scrollWrapper(0);
    },
    [filtersOn]
  );

  const packagesOutdatedNames = outdated && outdated.map(pkg => pkg.name);

  const handleAction = (action, mode) => {
    if (mode === 'local') {
      return toggleOptions(true);
    }

    const hasFlags = packagesInstallOptions && packagesInstallOptions.length;

    if (hasFlags && selected.length) {
      const dependencies = [];
      const devDependencies = [];
      const optionalDependencies = [];
      const bundleDependencies = [];
      const peerDependencies = [];
      const noSave = [];

      const packagesWithOptions = selected.reduce((acc, packageName) => {
        const flag = packagesInstallOptions.find(
          option => option.name === packageName
        );

        if (!flag) {
          dependencies.push(packageName);
        } else {
          switch (flag.options[0]) {
            case 'save-dev':
              devDependencies.push(packageName);
              break;
            case 'save-optional':
              optionalDependencies.push(packageName);
              break;
            case 'save-bundle':
              bundleDependencies.push(packageName);
              break;
            case 'no-save':
              noSave.push(packageName);
              break;
            case 'save-peer':
              peerDependencies.push(packageName);
              break;
            default:
              dependencies.push(packageName);
              break;
          }
        }

        return merge(acc, {
          dependencies,
          devDependencies,
          optionalDependencies,
          bundleDependencies,
          peerDependencies,
          noSave
        });
      }, {});

      const installations = Object.values(packagesWithOptions);
      const groups = Object.keys(packagesWithOptions);

      // run install multiple times
      const commands = installations.map((pkgs, idx) => ({
        operation: 'install',
        pkgs,
        group: groups[idx],
        flags: PACKAGE_GROUPS[groups[idx]]
      }));

      const parameters = {
        activeManager: manager,
        ipcEvent: 'install',
        cmd: pluck(
          'operation',
          commands.filter(command => command.pkgs.length)
        ),
        packages: pluck(
          'pkgs',
          commands.filter(command => command.pkgs.length)
        ),
        pkgOptions: pluck(
          'flags',
          commands.filter(command => command.pkgs.length)
        ),
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
          return switchMode('local', scanDirectory);
        }
      }
    );
  }, []);

  const renderAction = action =>
    switchcase({
      install: () => (
        <Tooltip title="Install selected">
          <IconButton
            color="primary"
            aria-label="install selected"
            onClick={() => handleAction('install', mode)}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      ),
      update: () => (
        <Tooltip title="Update selected">
          <IconButton
            color="primary"
            aria-label="update selected"
            onClick={() => handleAction('update', mode)}
          >
            <UpdateIcon />
          </IconButton>
        </Tooltip>
      ),
      uninstall: () => (
        <Tooltip title="Uninstall selected">
          <IconButton
            color="secondary"
            aria-label="uninstall selected"
            onClick={() => handleAction('uninstall', mode)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
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

  const renderToolbarActions = useCallback(
    () => (
      <React.Fragment>
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
              disabled={mode === 'global'}
              aria-label="Show globals"
              onClick={() => switchMode('global', null)}
            >
              <PublicIcon />
            </IconButton>
          </div>
        </Tooltip>
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
      </React.Fragment>
    ),
    []
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
        <div className={classes.spacer} />
        <div className={cn(classes.actions)}>
          {selected.length === 0 && renderToolbarActions()}
          {fromSearch && selected.length ? renderAction('install') : null}
          {!fromSearch &&
          selected.length &&
          selected.some(
            packageSelected =>
              packagesOutdatedNames.indexOf(packageSelected) !== -1
          )
            ? renderAction('update')
            : null}
          {!fromSearch && selected.length ? renderAction('uninstall') : null}
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
        <TableFilters mode={mode} close={() => openFilters(null, true)} />
      </Popover>
      <Dialog
        open={optionsOpen}
        onClose={() => toggleOptions(!optionsOpen)}
        aria-labelledby="install-options"
        maxWidth="md"
      >
        <DialogTitle id="install-options">Install options</DialogTitle>
        <DialogContent>
          <DialogContentText>{INFO_MESSAGES.installing}</DialogContentText>
          <Flags selected={selected} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleOptions(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleAction('install')}
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
  fromSearch: PropTypes.bool,
  scrollWrapper: PropTypes.func,
  outdated: PropTypes.arrayOf(PropTypes.object),
  packagesInstallOptions: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(TableListToolbar);
