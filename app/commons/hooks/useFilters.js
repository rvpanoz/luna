/* eslint-disable */

import { useState, useEffect } from 'react';
import { getFiltered } from 'commons/utils';

const useFilters = (data, filters) => {
  const [data, setData] = useState([]);

  useEffect(
    () => {
      const withFiltersPackages =
        filters && filters.length ? getFiltered(packages, filters) : packages;

      setData(withFiltersPackages);

      return [data];
    },
    [filters]
  );
};

export default useFilters;
