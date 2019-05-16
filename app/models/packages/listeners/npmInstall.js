import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { setPackagesStart } from '../actions';

const onNpmInstall$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-install-completed']);

  ipcRenderer.on('npm-install-completed', () => {
    try {
      observer.next(
        setPackagesStart({
          channel: 'npm-list-outdated',
          options: {
            cmd: ['outdated', 'list']
          }
        })
      );
    } catch (error) {
      observer.error(error);
    }
  });

  ipcRenderer.on('npm-install-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmInstall$;
