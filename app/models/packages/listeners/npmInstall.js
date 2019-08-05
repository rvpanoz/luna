import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { setActivePage, setSnackbar, toggleLoader } from 'models/ui/actions';
import { setRunningCommand } from 'models/npm/actions';
import { clearInstallOptions } from 'models/common/actions';
import { setPackagesStart } from '../actions';

import { iMessage } from 'commons/utils';

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

const onNpmInstall$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-install-completed']);

  ipcRenderer.on('npm-install-completed', (event, data, errors) => {
    try {
      observer.next(
        updateCommand({
          operationStatus: 'idle',
          operationCommand: null,
          operationPackages: []
        })
      );

      observer.next(clearInstallOptions());

      observer.next(
        setActivePage({
          page: 'packages',
          paused: false
        })
      );

      const isOk = errors && errors.trim().slice(errors.length - 4)

      if (isOk !== 'ok') {
        observer.next(
          setSnackbar({
            open: true,
            type: 'error',
            message: iMessage('info', 'installationError')
          })
        );

        observer.next(
          toggleLoader({
            loading: false
          })
        );
      } else {
        observer.next(
          setPackagesStart({
            channel: 'npm-list-outdated',
            options: {
              cmd: ['outdated', 'list']
            }
          })
        );
      }

    } catch (error) {
      observer.error(error);
    }
  });

  ipcRenderer.on('npm-install-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmInstall$;
