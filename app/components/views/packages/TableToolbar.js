import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import { PACKAGE_GROUPS } from 'constants/AppConstants';
import { switchcase } from 'commons/utils';
import {
  uninstallPackages,
  updatePackages,
  installMultiplePackages
} from 'models/packages/actions';
import { clearFilters } from 'models/ui/actions';

import {
  ClearFiltersAction,
  LatestAction,
  SwitchAction,
  FilterAction,
  RefreshAction,
  InstallAction,
  UpdateAction,
  UninstallAction
} from './ToolbarActions'
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

    if (action === 'install' && mode === 'local') {
      const pkgOptions = selected.map(packageName => {
        const packageDetails = packagesData.find(
          packageDataDetails => packageDataDetails.name === packageName
        );
        const { __group } = packageDetails;

        return [PACKAGE_GROUPS[__group]];
      });

      return dispatch(
        installMultiplePackages({
          ipcEvent: 'npm-install',
          cmd: selected.map(() => 'install'),
          multiple: true,
          pkgOptions: pkgOptions || [],
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

  const renderAction = action => switchcase({
    clearFilters: () => <ClearFiltersAction handler={clearAllFilters} />,
    install: () => <InstallAction handler={() => handleAction('install', false)} />,
    latest: () => <LatestAction handler={() => handleAction('install', true, true)} />,
    update: () => <UpdateAction handler={() => handleAction('update')} />,
    uninstall: () => <UninstallAction options={{ selected }} handler={() => handleAction('uninstall')} />,
    filters: () => <FilterAction handler={openFilters} />
  })('none')(action);


  const renderToolbarActions = () => (
    <React.Fragment>
      <SwitchAction handler={switchMode} options={{ mode }} />
      {!fromSearch && total ? <FilterAction options={{ nodata, fromSearch }} handler={openFilters} /> : null}
      <RefreshAction handler={reload} options={{ fromSearch }} />
    </React.Fragment>
  );

  const hasUpdatedPackages = useCallback(
    selected.length &&
    selected.some(
      packageSelected => packagesOutdatedNames.indexOf(packageSelected) !== -1
    ),
    [selected]
  );

  const hasPackagesSelected = selected && selected.length > 0;

  return (
    <div className={classes.root}>
      <Toolbar
        disableGutters
        className={cn({
          [classes.highlight]: hasPackagesSelected
        })}
      >
        <div className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            {!hasPackagesSelected
              ? `${title} ${total}`
              : `${selected.length} package(s) selected`}
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
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
    </div>
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
