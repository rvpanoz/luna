import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'redux-react-hook';
import {
  setActivePage,
  setPage,
  clearFilters,
  setSnackbar,
} from '../models/ui/actions';
import { setPackagesSearchStart } from '../models/packages/actions';

const Search = () => {
  const searchInputEl = useRef(null);
  const dispatch = useDispatch();
  const [packageName, setPackageName] = useState('');

  const handleClear = () => {
    const { current } = searchInputEl;

    if (current) {
      current.value = '';
      setPackageName('');
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
          message: 'Search parameter is missing',
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

  const onKeyUp = (evt) => {
    const {
      which,
      keyCode,
      currentTarget: { value },
    } = evt;
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
    <>
      <div className="absolute h-10 mt-1 left-0 top-0 flex items-center pl-10">
        <svg
          className="h-4 w-4 fill-current text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
        </svg>
      </div>
      <input
        ref={searchInputEl}
        id="search-toggle"
        type="search"
        placeholder="search"
        className="block w-2/3 bg-gray-200 focus:outline-none focus:bg-white focus:shadow-md text-gray-700 font-bold rounded-full pl-12 pr-4 py-3"
      />
    </>
  );
};

export default Search;
