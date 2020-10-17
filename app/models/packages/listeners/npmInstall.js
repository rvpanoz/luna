import { ipcRenderer } from 'electron';
import { Subject } from 'rxjs';
import { setActivePage } from 'models/ui/actions';
import { setRunningCommand } from 'models/npm/actions';
import { clearInstallOptions } from 'models/common/actions';
import { setPackagesStart } from '../actions';

const updateCommand = ({
  operationStatus,
  operationPackages,
  operationCommand,
}) => ({
  type: setRunningCommand.type,
  payload: {
    operationStatus,
    operationPackages,
    operationCommand,
  },
});

const onNpmInstall$ = new Subject();

ipcRenderer.removeAllListeners(['npm-install-completed']);

ipcRenderer.on('npm-install-completed', () => {
  try {
    onNpmInstall$.next(clearInstallOptions());
    onNpmInstall$.next(
      updateCommand({
        operationStatus: 'idle',
        operationCommand: null,
        operationPackages: [],
      })
    );

    onNpmInstall$.next(
      setActivePage({
        page: 'packages',
        paused: false,
      })
    );

    onNpmInstall$.next(
      setPackagesStart({
        channel: 'npm-list-outdated',
        options: {
          cmd: ['outdated', 'list'],
        },
      })
    );
  } catch (error) {
    onNpmInstall$.error(error);
  }
});

ipcRenderer.on('npm-install-error', (event, error) =>
  onNpmInstall$.error(error)
);

export default onNpmInstall$;
