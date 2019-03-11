/* eslint-disable array-callback-return */

import { useState, useEffect } from 'react';
import { PACKAGE_GROUPS } from 'constants/AppConstants';

const getFiltered = (data, filters) => {
  const groups = Object.keys(PACKAGE_GROUPS);

  const withFiltersData = filters.reduce((acc, filterName) => {
    const filtered =
      data &&
      data.filter(pkg => {
        if (groups.indexOf(filterName) > -1) {
          return pkg.__group === filterName;
        }

        return !!pkg[filterName];
      });

    if (filtered.length) {
      return acc ? acc.concat(filtered) : [];
    }
  }, []);

  return withFiltersData;
};

const useFilters = (allData, filters, force) => {
  const [filtered, applyFilters] = useState(allData);

  useEffect(() => {
    const withFiltersPackages =
      filters && filters.length ? getFiltered(allData, filters) : allData;

    if (Array.isArray(withFiltersPackages)) {
      applyFilters(withFiltersPackages);
    }
  }, [filters, force]);

  return [filtered];
};

export default useFilters;
