/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */

import { useState, useEffect } from 'react';
import { PACKAGE_GROUPS } from 'constants/AppConstants';

const getFiltered = (data, filters) => {
  const groups = Object.keys(PACKAGE_GROUPS);

  const withFiltersData =
    data &&
    data.reduce((acc = [], pkg) => {
      const { name } = pkg;
      const pkgIn = acc.find((pack) => pack.name.indexOf(name) > -1);

      if (pkgIn) {
        return acc;
      }

      // for each pkg run filter to match criteria
      filters.forEach((filterDetails) => {
        const { filterType, filterValue } = filterDetails;

        if (groups.indexOf(filterValue) > -1 && pkg.__group === filterValue) {
          acc.push(pkg);
        }

        if (
          acc.indexOf(pkg) === -1 &&
          filterType === 'name' &&
          filterValue &&
          name.indexOf(filterValue) > -1
        ) {
          acc.push(pkg);
        }

        if (pkg[filterValue] && acc.indexOf(pkg) === -1) {
          acc.push(pkg);
        }
      });

      return acc;
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
  }, [filters, force, allData]);

  return [filtered];
};

export default useFilters;
