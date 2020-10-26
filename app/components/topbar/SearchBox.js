import React from 'react';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'redux-react-hook';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import {
  setActivePage,
  setPage,
  clearFilters,
  setSnackbar,
} from 'models/ui/actions';
import { setPackagesSearchStart } from 'models/packages/actions';
import { iMessage } from 'commons/utils';
import styles from './styles/searchBox';

const SearchBox = ({ classes, disabled, onlineStatus }) => {
  const searchInputEl = useRef(null);
  const dispatch = useDispatch();
  const [packageName, setPackageName] = useState('');

  const handleClear = () => {
    const { current } = searchInputEl;

    if (current) {
      current.value = '';
      setPackageName(current.value);
    }

    return false;
  };

  const handleSearch = () => {
    dispatch(
      setSnackbar({
        open: false,
        type: 'info',
        message: null,
      })
    );

    if (!packageName || packageName.length < 2) {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: iMessage('error', 'searchMissing'),
        })
      );

      return;
    }

    dispatch(clearFilters());

    dispatch({
      type: setActivePage.type,
      payload: {
        page: 'packages',
        paused: true,
      },
    });

    dispatch({
      type: setPage.type,
      payload: {
        page: 0,
      },
    });

    dispatch(
      setPackagesSearchStart({
        channel: 'npm-search',
        options: {
          cmd: ['search'],
          pkgName: packageName,
          fromSearch: true,
        },
      })
    );

    return false;
  };

  const onKeyUp = (e) => {
    const {
      which,
      keyCode,
      currentTarget: { value },
    } = e;
    const key = which || keyCode || 0;

    setPackageName(value);

    if (key === 13) {
      handleSearch();
    }
  };

  useEffect(() => {
    const { current } = searchInputEl;

    if (current) {
      current.addEventListener('keyup', onKeyUp, () => {});

      return () => current.removeEventListener('keyup', onKeyUp);
    }
  });

  return (
    <div className={classes.root}>
      {packageName && packageName.length ? (
        <a href="#" className={classes.searchIcon} onClick={handleClear}>
          <ClearIcon />
        </a>
      ) : (
        <a href="#" className={classes.searchIcon} onClick={handleSearch}>
          <SearchIcon />
        </a>
      )}

      <InputBase
        disabled={disabled || onlineStatus === 'offline'}
        placeholder="Search npm registry"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{
          ref: searchInputEl,
        }}
      />
    </div>
  );
};

SearchBox.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  onlineStatus: PropTypes.string,
};

export default withStyles(styles)(SearchBox);
