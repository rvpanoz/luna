import { remote, ipcRenderer } from 'electron';
import { showMessageBox } from '../../utils';

const install = (pkg, version, cb) => {
  showMessageBox({
    action: 'install',
    name: pkg.name,
    version: version
  }, () => {
    if(cb) cb();
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'install-package',
      pkgName: pkg.name,
      pkgVersion: version,
      params: ['g']
    });
  });
}

const update = (pkg, version, cb) => {
  showMessageBox({
    action: 'update',
    name: pkg.name,
    version: version
  }, () => {
    if(cb) cb();
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'update-package',
      pkgName: pkg.name,
      pkgVersion: 'latest',
      params: ['g']
    });
  });
}

const uninstall = (pkg, version, cb) => {
  showMessageBox({
    action: 'uninstall',
    name: pkg.name
  }, () => {
    if(cb) cb();
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'uninstall-package',
      pkgName: pkg.name,
      params: ['g']
    });
  });
}

module.exports = {
  install,
  update,
  uninstall
}
