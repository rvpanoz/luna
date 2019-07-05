/* eslint-disable */

import React from 'react';
import { remote } from 'electron';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import ClearIcon from '@material-ui/icons/Clear';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SwitchIcon from '@material-ui/icons/LoopOutlined';

import { iMessage } from 'commons/utils';

export const SwitchAction = ({ options, handler }) => {
  const { mode } = options;

  return (
    <Tooltip title={iMessage('title', 'switchGlobals')}>
      <div>
        <IconButton
          disableRipple
          disabled={mode === 'global'}
          aria-label="show-globals"
          onClick={() => handler('global', null)}
        >
          <SwitchIcon />
        </IconButton>
      </div>
    </Tooltip>
  );
};

SwitchAction.propTypes = {
  handler: PropTypes.func.isRequired,
  options: PropTypes.objectOf(PropTypes.string)
};

export const FilterAction = ({ options, handler }) => {
  const { nodata, fromSearch } = options;

  return (
    <Tooltip title={iMessage('title', 'showFilters')}>
      <div>
        <IconButton
          disableRipple
          disabled={nodata || fromSearch}
          aria-label="show-filters"
          onClick={handler}
        >
          <FilterListIcon />
        </IconButton>
      </div>
    </Tooltip>
  );
};

export const RefreshAction = ({ options, handler }) => {
  const { fromSearch } = options;

  return (
    <Tooltip
      title={
        fromSearch
          ? iMessage('title', 'backList')
          : iMessage('title', 'listReload')
      }
    >
      <div>
        <IconButton disableRipple aria-label="back-reload" onClick={handler}>
          <RefreshIcon />
        </IconButton>
      </div>
    </Tooltip>
  );
};

export const ClearFiltersAction = ({ handler }) => (
  <Tooltip title={iMessage('title', 'clearFilters')}>
    <IconButton
      color="secondary"
      aria-label="clear-filters"
      onClick={() => handler('clearFilters')}
    >
      <ClearIcon />
    </IconButton>
  </Tooltip>
);

export const InstallAction = ({ handler }) => (
  <Tooltip title={iMessage('title', 'installSelected')}>
    <IconButton
      color="primary"
      aria-label="install-selected"
      onClick={() =>
        remote.dialog.showMessageBox(
          remote.getCurrentWindow(),
          {
            title: iMessage('title', 'installSelected'),
            type: 'question',
            message: iMessage('confirmation', 'installSelected'),
            buttons: ['Cancel', 'Install']
          },
          btnIdx => {
            if (Boolean(btnIdx) === true) {
              handler('install');
            }
          }
        )
      }
    >
      <AddIcon />
    </IconButton>
  </Tooltip>
);

export const LatestAction = ({ handler }) => (
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
              handler('install', true, true);
            }
          }
        )
      }
    >
      <AddIcon />
    </IconButton>
  </Tooltip>
);

export const UpdateAction = ({ handler }) => (
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
              handler('update');
            }
          }
        )
      }
    >
      <UpdateIcon />
    </IconButton>
  </Tooltip>
);

export const UninstallAction = ({ options, handler }) => {
  const { selected } = options;
  const hasOneSelected = selected && selected.length === 1;
  const hasNpmSelected = selected && selected.indexOf('npm') > -1;

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
                handler('uninstall');
              }
            }
          )
        }
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};
