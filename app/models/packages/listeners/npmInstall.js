import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { setActivePage, setSnackbar, toggleLoader } from 'models/ui/actions';
import { setRunningCommand } from 'models/npm/actions';
import { clearInstallOptions } from 'models/common/actions';
import { iMessage } from 'commons/utils';
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

const onNpmInstall$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-install-completed']);

  ipcRenderer.on('npm-install-completed', (event, data, errors, cmd, fromPackageJson) => {
    try {
      observer.next(clearInstallOptions());
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

      const isOk = errors && errors.includes('npm info ok');

      if (!isOk && !fromPackageJson) {
        observer.next(
          setSnackbar({
            open: true,
            type: 'error',
            message: iMessage('error', 'installationError')
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

  ipcRenderer.on('npm-install-error', (event, error) => observer.error(error));
});

export default onNpmInstall$;
