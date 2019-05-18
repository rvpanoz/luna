/* eslint-disable import/prefer-default-export */

import onListOutdatedPackages$ from './listOutdatedPackages';
import onSearchPackages$ from './searchPackages';
import onViewPackage$ from './viewPackage';
import onNpmActions$ from './npmActions';
import onNpmInstall$ from './npmInstall';
import onNpmUninstall$ from './npmUninstall';

export {
  onListOutdatedPackages$,
  onNpmActions$,
  onSearchPackages$,
  onViewPackage$,
  onNpmInstall$,
  onNpmUninstall$
};
