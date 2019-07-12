import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { setRunningCommand, parseNpmAuditData } from 'models/npm/actions';
import { toggleLoader, setActivePage, setSnackbar } from 'models/ui/actions';

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

const onNpmAudit$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-audit-completed']);

  ipcRenderer.on('npm-audit-completed', (event, data) => {
    const dataToJson = JSON.parse(data)
    console.log(dataToJson);

    observer.next(
      updateCommand({
        operationStatus: 'idle',
        operationCommand: null,
        operationPackages: []
      })
    );

    observer.next(parseNpmAuditData(data));

    observer.next(setActivePage({ page: 'audit', paused: true }));

    observer.next(
      setSnackbar({
        open: true,
        type: 'info',
        message: 'npm audit completed'
      })
    );

    observer.next(
      toggleLoader({
        loading: false,
        message: null
      })
    );
  });

  ipcRenderer.on('npm-audit-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmAudit$;
