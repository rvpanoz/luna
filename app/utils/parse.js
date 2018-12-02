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

export function setupPackagesFromResponse(packages) {
  if (!packages || !packages.length) {
    return;
  }

  try {
    const data = parse(packages, 'dependencies');

    if (!data || !Array.isArray(data)) {
      throw new Error('Critical: cannot parse packages');
    }

    const mappedPackages = data.map(pkg => {
      const name = pkg.name;
      const _hasError = typeof pkg.error === 'object';
      let _group = null,
        _hasPeerMissing = false;

      const { version, peerMissing, required, missing, _from, link } = pkg;

      return Rmerge(pkg, {
        _group,
        _hasPeerMissing,
        _hasError
      });
    });

    const listPackages = Rfilter(pkg => {
      return !pkg._hasPeerMissing && !pkg._hasError;
    }, mappedPackages);

    return listPackages;
  } catch (e) {
    throw new Error(e);
  }
}
