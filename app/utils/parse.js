/* eslint-disable import/prefer-default-export */
/* eslint-disable dot-notation */

import fs from 'fs';
import path from 'path';
import { filter as Rfilter, merge as Rmerge, prop as Rprop } from 'ramda';
import { APP_MODES, PACKAGE_GROUPS } from '../constants/AppConstants';

const parseResponse = (data, key, all) => {
  try {
    let packages = JSON.parse(data);

    if (key && packages[key]) {
      packages = packages[key];
      return Object.keys(packages).map(pkey => packages[pkey]);
    }
    return [];
  } catch (error) {
    throw new Error(error);
  }
};

export const setupPackagesFromResponse = (
  response,
  packagesOutdated = [],
  mode = 'GLOBAL',
  packageJSON = {}
) => {
  if (Boolean(response.length) === false) {
    return;
  }

  const data = parseResponse(response, 'dependencies');

  if (!data || !Array.isArray(data)) {
    throw new Error('Cannot parse packages');
  }

  const mappedPackages = data.map(pkg => {
    const {
      version,
      error,
      peerMissing,
      name,
      required,
      missing,
      _from,
      link
    } = pkg;
    const hasError = typeof error === 'object';
    let group = null;
    let hasPeerMissing = false;

    // find group and attach to pkg, useful to show data in list
    if (mode === APP_MODES.LOCAL && typeof packageJSON === 'object') {
      let found = false;

      Object.keys(PACKAGE_GROUPS).some(groupName => {
        found = packageJSON[groupName] && packageJSON[groupName][name];
        if (found) {
          group = groupName;
        }

        return found;
      });
    }

    if (hasError) {
      return Rmerge(pkg, {
        hasError: pkg.error
      });
    }

    const outdatedPackage = Rprop(name, packagesOutdated);

    if (peerMissing && Array.isArray(peerMissing)) {
      hasPeerMissing = true;
      // TODO: add error messages
    }

    if (
      outdatedPackage &&
      typeof outdatedPackage === 'object' &&
      version !== outdatedPackage.latest
    ) {
      return Rmerge(pkg, {
        group,
        hasPeerMissing,
        latest: outdatedPackage.latest
      });
    }

    return Rmerge(pkg, {
      group,
      hasPeerMissing
    });
  });

  const listPackages = Rfilter(pkg => {
    return !pkg.hasPeerMissing && !pkg.hasError;
  }, mappedPackages);

  return listPackages;
};
