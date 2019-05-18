import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { setRunningCommand } from 'models/npm/actions';
import { setSnackbar } from 'models/ui/actions';
import { removePackages, setActive } from '../actions';

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

const onNpmUninstall$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-uninstall-completed']);

  ipcRenderer.on(
    'npm-uninstall-completed',
    (event, resultMessage, errors, packages) => {
      observer.next(
        setActive({
          active: null
        })
      );

      observer.next(
        updateCommand({
          operationStatus: 'idle',
          operationCommand: null,
          operationPackages: []
        })
      );

      observer.next(removePackages({ removedPackages: packages }));

      observer.next(
        setSnackbar({
          open: true,
          type: 'info',
          message: resultMessage
        })
      );
    }
  );

  ipcRenderer.on('npm-uninstall-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmUninstall$;
