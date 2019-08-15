import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { setActivePage } from 'models/ui/actions';
import { setRunningCommand } from 'models/npm/actions';
import { setPackagesStart } from '../actions';

const updateCommand = ({
  operationStatus,
  operationPackages,
  operationCommand
}) => ({
  type: setRunningCommand.type,
  payload: {
    operationStatus,
    operationPackages,
    operationCommand
  }
});

const onNpmUpdate$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-update-completed']);

  ipcRenderer.on('npm-update-completed', () => {
    try {
      observer.next(
        updateCommand({
          operationStatus: 'idle',
          operationCommand: null,
          operationPackages: []
        })
      );

      observer.next(
        setActivePage({
          page: 'packages',
          paused: false
        })
      );

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

  ipcRenderer.on('npm-update-error', (event, error) => observer.error(error));
});

export default onNpmUpdate$;
