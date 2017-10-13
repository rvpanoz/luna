import { remote, ipcRenderer } from 'electron';
import { showMessageBox } from '../../utils';

const install = (pkg, version, cb) => {
  showMessageBox({
    action: 'INSTALL',
    name: pkg.name,
    version: version || 'latest'
  }, () => {
    if(cb) cb();
    ipcRenderer.send('install-package', {
      pkgName: pkg.name,
      scope: 'g',
      pkgVersion: version || 'latest'
    });
  });
}

const update = (pkg, version, cb) => {
  showMessageBox({
    action: 'UPDATE',
    name: pkg.name,
    version: version
  }, () => {
    if(cb) cb();
    ipcRenderer.send('update-package', {
      pkgName: pkg.name,
      pkgVersion: version,
      scope: 'g'
    });
  });
}

const uninstall = (pkg, version, cb) => {
  showMessageBox({
    action: 'UNINSTALL',
    name: pkg.name
  }, () => {
    if(cb) cb();
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
