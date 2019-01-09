/* eslint-disable */

import { useState, useEffect } from 'react';
import { getFiltered } from 'commons/utils';

const useFilters = (allData, filters, force) => {
  const [filtered, applyFilters] = useState(allData);

  useEffect(
    () => {
      const withFiltersPackages =
        filters && filters.length ? getFiltered(allData, filters) : allData;

      Array.isArray(withFiltersPackages) && applyFilters(withFiltersPackages);
    },
    [filters, force]
  );

  return [filtered];
};

export default useFilters;
