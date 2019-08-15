import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { setRunningCommand } from 'models/npm/actions';
import { setMode } from 'models/common/actions';
import { setActivePage, setSnackbar } from 'models/ui/actions';

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

const onNpmInit$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-init-completed']);

  ipcRenderer.on('npm-init-completed', (event, errors, data, initDirectory) => {
    observer.next(
      updateCommand({
        operationStatus: 'idle',
        operationCommand: null,
        operationPackages: []
      })
    );

    observer.next(setActivePage({ page: 'packages', paused: false }));
    observer.next(setMode({ mode: 'local', directory: initDirectory }));

    observer.next(
      setSnackbar({
        open: true,
        type: 'info',
        message: 'npm init completed'
      })
    );
  });

  ipcRenderer.on('npm-init-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmInit$;
