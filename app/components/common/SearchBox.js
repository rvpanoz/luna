/* eslint-disable react/require-default-props */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'redux-react-hook';
import { ipcRenderer } from 'electron';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from 'components/common/SnackbarContent';

import { parseMap } from 'commons/utils';
import { setPackagesStart, updateData } from 'models/packages/actions';

import styles from './styles/searchBox';

const SearchBox = ({ classes, disabled }) => {
  const rootEl = useRef(null);
  const dispatch = useDispatch();
  const [packageName, setPackageName] = useState('');
  const [snackbarOpen, toggleSnackbar] = useState(false);

  const handleSearch = () => {
    toggleSnackbar(false);

    if (!packageName) {
      return toggleSnackbar(true);
    }

    dispatch(
      setPackagesStart({
        fromSearch: true
      })
    );

    ipcRenderer.send('ipc-event', {
      ipcEvent: 'search-packages',
      cmd: ['search'],
      pkgName: packageName
    });

    return false;
  };

  const onKeyUp = e => {
    const {
      which,
      keyCode,
      currentTarget: { value }
    } = e;
    const key = which || keyCode || 0;

    setPackageName(value);

    if (key === 13) {
      handleSearch();
    }
  };

  useEffect(() => {
    ipcRenderer.on(
      'search-packages-close',
      (event, status, commandArgs, data) => {
        try {
          const [packages] = (data && parseMap(data)) || [];

          dispatch(
            updateData({
              fromSearch: true,
              outdated: [],
              dependencies: packages
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
      rootEl.current.addEventListener('keyup', onKeyUp, () => {});

      return () => rootEl.current.removeEventListener('keyup', onKeyUp);
    }
  });

  return (
    <React.Fragment>
      <div className={classes.search}>
        <a href="#" className={classes.searchIcon} onClick={handleSearch}>
          <SearchIcon />
        </a>
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
        autoHideDuration={5000}
        onClose={() => toggleSnackbar(false)}
      >
        <SnackbarContent
          onClose={() => toggleSnackbar(false)}
          variant="error"
          message="Package name is missing or value is invalid"
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
