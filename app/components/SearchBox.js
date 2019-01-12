/* eslint-disable */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'redux-react-hook';
import { ipcRenderer } from 'electron';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from 'components/layout/SnackbarContent';

import { parseMap } from 'commons/utils';
import {
  onStartPackages,
  onSetPackagesSuccess
} from 'models/packages/selectors';
import { onClearNotifications, onToggleLoader } from 'models/ui/selectors';

import styles from './styles/searchBox';

const SearchBox = props => {
  const { classes, disabled } = props;
  const rootEl = useRef(null);
  const [snackbarOpen, toggleSnackbar] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = () => {
    const searchValue = rootEl && rootEl.current.value;

    toggleSnackbar(false);

    if (!searchValue || searchValue.length <= 3) {
      toggleSnackbar(true);
      return;
    }

    onStartPackages(dispatch);

    ipcRenderer.send('ipc-event', {
      ipcEvent: 'search-packages',
      cmd: ['search'],
      pkgName: searchValue
    });

    return false;
  };

  const onKeyPress = e => {
    const { which, keyCode } = e;
    const key = which || keyCode || 0;

    if (key === 13) {
      handleSearch();
    }

    return false;
  };

  useEffect(() => {
    ipcRenderer.on(
      'search-packages-close',
      (event, status, commandArgs, data) => {
        try {
          const [name, version, packages] = (data && parseMap(data)) || [];

          onSetPackagesSuccess(dispatch, {
            fromSearch: true,
            outdated: null,
            dependencies: packages
          });
        } catch (e) {
          throw new Error(e);
        }
      }
    );

    return () => ipcRenderer.removeAllListeners(['search-packages-close']);
  });

  useEffect(() => {
    if (rootEl && rootEl.current) {
      rootEl.current.addEventListener('keypress', onKeyPress);

      return () => rootEl.current.removeEventListener('keypress', onKeyPress);
    }
  });

  return (
    <React.Fragment>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          disabled={disabled}
          placeholder="Search for packages…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{
            ref: rootEl
          }}
        />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => toggleSnackbar(false)}
      >
        <SnackbarContent
          onClose={() => toggleSnackbar(false)}
          variant="error"
          message="Package name is missing or value is too short"
        />
      </Snackbar>
    </React.Fragment>
  );
};

SearchBox.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool
};

export default withStyles(styles)(SearchBox);
