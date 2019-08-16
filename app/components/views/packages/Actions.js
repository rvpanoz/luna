import React from 'react';
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
import { iMessage, showDialog } from 'commons/utils';

export const SwitchAction = ({ handler, options }) => {
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
  options: PropTypes.shape({
    mode: PropTypes.string
  })
};

export const FilterAction = ({ handler, options }) => {
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
    </Tooltip >
  );
};

FilterAction.propTypes = {
  handler: PropTypes.func.isRequired,
  options: PropTypes.shape({
    nodata: PropTypes.bool,
    fromSearch: PropTypes.bool
  })
};

export const RefreshAction = ({ handler, options }) => {
  const { fromSearch } = options;
  const title = fromSearch
    ? iMessage('title', 'backList')
    : iMessage('title', 'listReload');

  return (
    <div>
      <Tooltip title={title}>
        <div>
          <IconButton disableRipple aria-label="back-reload" onClick={handler}>
            <RefreshIcon />
          </IconButton>
        </div>
      </Tooltip>
    </div>
  );
};

RefreshAction.propTypes = {
  handler: PropTypes.func.isRequired,
  options: PropTypes.shape({
    fromSearch: PropTypes.bool
  })
};

export const ClearFiltersAction = ({ handler }) => (
  <div>
    <Tooltip title={iMessage('title', 'clearFilters')}>
      <IconButton
        color="secondary"
        aria-label="clear-filters"
        onClick={() => handler('clearFilters')}
      >
        <ClearIcon />
      </IconButton>
    </Tooltip>
  </div>
);

ClearFiltersAction.propTypes = {
  handler: PropTypes.func.isRequired
};

export const InstallAction = ({ handler }) => {
  const dialogOptions = {
    title: iMessage('title', 'installSelected'),
    type: 'question',
    message: iMessage('confirmation', 'installSelected'),
    buttons: ['Cancel', 'Install']
  };
  const dialogHandler = () => handler('install');
  const onClickHandler = () => showDialog(dialogHandler, dialogOptions);

  return (
    <div>
      <Tooltip title={iMessage('title', 'installSelected')}>
        <IconButton
          color="primary"
          aria-label="install-selected"
          onClick={onClickHandler}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

InstallAction.propTypes = {
  handler: PropTypes.func.isRequired
};

export const LatestAction = ({ handler }) => {
  const dialogOptions = {
    title: iMessage('title', 'installLatest'),
    type: 'question',
    message: iMessage('confirmation', 'installLatestSelected'),
    buttons: ['Cancel', 'Install']
  };

  const dialogHandler = () => handler('install', true, true);
  const onClickHandler = () => showDialog(dialogHandler, dialogOptions);

  return (
    <div>
      <Tooltip title={iMessage('title', 'installLatest')}>
        <IconButton
          color="primary"
          aria-label="install-latest"
          onClick={onClickHandler}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

LatestAction.propTypes = {
  handler: PropTypes.func.isRequired
};

export const UpdateAction = ({ handler }) => {
  const dialogOptions = {
    title: iMessage('title', 'updateSelected'),
    type: 'question',
    message: iMessage('confirmation', 'updateSelected'),
    buttons: ['Cancel', 'Update']
  };

  const dialogHandler = () => handler('update');
  const onClickHandler = () => showDialog(dialogHandler, dialogOptions);

  return (
    <div>
      <Tooltip title={iMessage('title', 'updateSelected')}>
        <IconButton
          color="primary"
          aria-label="update-selected"
          onClick={onClickHandler}
        >
          <UpdateIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

UpdateAction.propTypes = {
  handler: PropTypes.func.isRequired
};

export const UninstallAction = ({ handler, options }) => {
  const { selected } = options;
  const hasNpmSelected = selected && selected.indexOf('npm') > -1;

  const dialogOptions = {
    title: iMessage('title', 'uninstallSelected'),
    type: 'question',
    message: iMessage('confirmation', 'uninstallSelected'),
    buttons: ['Cancel', 'Uninstall']
  };

  const dialogHandler = () => handler('uninstall');
  const onClickHandler = () => showDialog(dialogHandler, dialogOptions);

  // avoid npm uninstallation :)
  return hasNpmSelected ? null : (
    <div>
      <Tooltip title={iMessage('title', 'uninstallSelected')}>
        <IconButton
          color="secondary"
          aria-label="uninstall-selected"
          onClick={onClickHandler}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

UninstallAction.propTypes = {
  handler: PropTypes.func.isRequired,
  options: PropTypes.shape({
    selected: PropTypes.arrayOf(PropTypes.string)
  })
};
