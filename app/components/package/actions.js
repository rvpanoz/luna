import { remote, ipcRenderer } from 'electron';
import { showMessageBox } from '../../utils';

const install = (pkg, version, cb) => {
  showMessageBox({
    action: 'install',
    name: pkg.name,
    version: version
  }, () => {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'install-package',
      pkgName: pkg.name,
      pkgVersion: version,
      params: ['g']
    });
    if(cb) cb();
  });
}

const update = (pkg, version, cb) => {
  showMessageBox({
    action: 'update',
    name: pkg.name
  }, () => {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'update-package',
      pkgName: pkg.name,
      params: ['g']
    });
    if(cb) cb();
  });
}

const uninstall = (pkg, version, cb) => {
  showMessageBox({
    action: 'uninstall',
    name: pkg.name
  }, () => {
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'uninstall-package',
      pkgName: pkg.name,
      params: ['g']
    });
    if(cb) cb();
  });
}

module.exports = {
  install,
  update,
  uninstall
}
