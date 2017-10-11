import { remote, ipcRenderer } from 'electron';
import { showMessageBox } from '../../../utils';

const install = (pkg, version) => {
  showMessageBox({
    action: 'INSTALL',
    name: pkg.name,
    version: version || 'latest'
  }, () => {
    ipcRenderer.send('install-package', {
      pkgName: pkg.name,
      scope: 'g',
      pkgVersion: version || 'latest'
    });
  });
}

const update = (pkg, version) => {
  showMessageBox({
    action: 'UPDATE',
    name: pkg.name,
    version: version
  }, () => {
    ipcRenderer.send('update-package', {
      pkgName: pkg.name,
      pkgVersion: version,
      scope: 'g'
    });
  });
}

const uninstall = (pkg) => {
  showMessageBox({
    action: 'UNINSTALL',
    name: pkg.name
  }, () => {
    ipcRenderer.send('uninstall-package', {
      pkgName: pkg.name,
      scope: 'g'
    });
  });
}

module.exports = {
  install,
  update,
  uninstall
}
