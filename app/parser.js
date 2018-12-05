/**
 * Parser class
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const ROOTDIR = __dirname;

class Parser {
  _manager = null;

  constructor(manager = 'npm') {
    this._manager = manager;
  }

  parse(data) {
    if (typeof data === 'string' && Boolean(data.length) === false) {
      return;
    }

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
  }

  readPackageJson() {
    try {
      const packageJSON = fs.readFileSync(
        path.join(ROOTDIR, '../package.json'),
        {
          encoding: 'utf8'
        }
      );

      return JSON.parse(packageJSON);
    } catch (error) {
      throw new Error(error);
    }
  }

  destructor() {
    console.log('desctructing Parser');
  }
}

export default Parcer;
