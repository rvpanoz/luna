import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { setRunningCommand } from 'models/npm/actions';
import { toggleLoader, setActivePage, setSnackbar } from 'models/ui/actions';

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

const onNpmInitLock$ = new Observable((observer) => {
  ipcRenderer.removeAllListeners(['npm-init-lock-completed']);

  ipcRenderer.on('npm-init-lock-completed', () => {
    observer.next(
      updateCommand({
        operationStatus: 'idle',
        operationCommand: null,
        operationPackages: [],
      })
    );

    observer.next(setActivePage({ page: 'packages' }));

    observer.next(
      setSnackbar({
        open: true,
        type: 'info',
        message: 'npm init completed',
      })
    );

    observer.next(
      toggleLoader({
        loading: false,
        message: null,
      })
    );
  });

  ipcRenderer.on('npm-init-lock-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmInitLock$;
