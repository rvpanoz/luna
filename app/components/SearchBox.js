/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'redux-react-hook';
import { ipcRenderer } from 'electron';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from 'components/layout/SnackbarContent';

import { parseMap } from 'commons/utils';
import { setPackagesStart, setPackagesSuccess } from 'models/packages/actions';
import { clearNotifications } from 'models/ui/actions';

import styles from './styles/searchBox';

const SearchBox = props => {
  const { classes } = props;
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

    dispatch(clearNotifications());
    dispatch(setPackagesStart());

    ipcRenderer.send('ipc-event', {
      ipcEvent: 'search-packages',
      cmd: ['search'],
      pkgName: searchValue
    });
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

          dispatch(
            setPackagesSuccess({
              name,
              version,
              fromSearch: true,
              outdated: null,
              data: packages
            })
          );
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

export default withStyles(styles)(SearchBox);
