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

import { parseFromSearch } from 'commons/utils';
import { setActivePage } from 'models/ui/actions';
import { setPackagesStart, updateData } from 'models/packages/actions';

import styles from './styles/searchBox';

const SearchBox = ({ classes, disabled, onlineStatus }) => {
  const rootEl = useRef(null);
  const dispatch = useDispatch();
  const [packageName, setPackageName] = useState('');
  const [snackbarOpen, toggleSnackbar] = useState(false);

  const handleSearch = () => {
    toggleSnackbar(false);

    if (!packageName) {
      return toggleSnackbar(true);
    }

    const parameters = {
      ipcEvent: 'search-packages',
      cmd: ['search'],
      pkgName: packageName
    };

    dispatch({
      type: setActivePage.type,
      payload: {
        page: 'packages',
        paused: false
      }
    });

    dispatch(
      setPackagesStart({
        channel: 'ipc-event',
        fromSearch: true,
        options: {
          ...parameters
        }
      })
    );

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
        const [packages] = parseFromSearch(data) || [];

        dispatch(
          updateData({
            fromSearch: true,
            outdated: [],
            dependencies: packages
          })
        );
      }
    );

    return () => ipcRenderer.removeAllListeners(['search-packages-close']);
  }, [dispatch]);

  useEffect(() => {
    const { current } = rootEl;
    if (current) {
      current.addEventListener('keyup', onKeyUp, () => {});

      return () => current.removeEventListener('keyup', onKeyUp);
    }
  });

  return (
    <React.Fragment>
      <div className={classes.search}>
        <a href="#" className={classes.searchIcon} onClick={handleSearch}>
          <SearchIcon />
        </a>
        <InputBase
          disabled={disabled || onlineStatus === 'offline'}
          placeholder="Search npm registry"
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
  disabled: PropTypes.bool,
  onlineStatus: PropTypes.string
};

export default withStyles(styles)(SearchBox);
