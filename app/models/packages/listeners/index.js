/* eslint-disable import/prefer-default-export */

import onListOutdatedPackages$ from './listOutdatedPackages';
import onSearchPackages$ from './npmSearch';
import onViewPackage$ from './npmView';
import onNpmInstall$ from './npmInstall';
import onNpmUninstall$ from './npmUninstall';
import onNpmUpdate$ from './npmUpdate';

export {
  onListOutdatedPackages$,
  onSearchPackages$,
  onViewPackage$,
  onNpmInstall$,
  onNpmUninstall$,
  onNpmUpdate$
};
