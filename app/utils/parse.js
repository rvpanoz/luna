/* eslint-disable import/prefer-default-export */

import { filter as Rfilter, merge as Rmerge, prop as Rprop } from 'ramda';
import { APP_MODES, PACKAGE_GROUPS } from '../constants/AppConstants';

function parse(data, key, all) {
  let packages;

  try {
    packages = JSON.parse(data);
    return Object.keys(packages).map(pkey => packages[pkey]);
  } catch (error) {
    throw new Error(error);
  }
}

export const setupPackagesFromResponse = packages => {
  if (!packages || !packages.length) {
    return;
  }

  try {
    const data = parse(packages, 'dependencies');

    if (!data || !Array.isArray(data)) {
      throw new Error('Critical: cannot parse packages');
    }

    const mappedPackages = data.map(pkg => {
      const {
        name,
        version,
        peerMissing,
        error,
        required,
        missing,
        _from,
        link
      } = pkg;
      const hasError = typeof error === 'object';
      const group = null;
      const hasPeerMissing = false;

      return Rmerge(pkg, {
        group,
        hasPeerMissing,
        hasError
      });
    });

    const listPackages = Rfilter(pkg => {
      return !pkg.hasPeerMissing && !pkg.hasError;
    }, mappedPackages);

    return listPackages;
  } catch (e) {
    throw new Error(e);
  }
};
