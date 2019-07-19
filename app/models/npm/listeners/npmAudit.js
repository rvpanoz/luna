import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { setRunningCommand, parseNpmAuditData, parseNpmAuditFixData } from 'models/npm/actions';
import { toggleAuditLoader, setActivePage, setSnackbar } from 'models/ui/actions';
import { iMessage } from 'commons/utils'

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
  ipcRenderer.removeAllListeners(['npm-audit-completed', 'npm-audit-fix-completed', 'npm-audit-error']);

  ipcRenderer.on('npm-audit-completed', (event, error, data) => {
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
      toggleAuditLoader({
        loading: false,
        message: null
      })
    );

    observer.next(
      setSnackbar({
        open: true,
        type: 'info',
        message: iMessage('info', 'auditCompleted')
      })
    );
  });

  ipcRenderer.on('npm-audit-fix-completed', (event, error, data) => {
    observer.next(
      updateCommand({
        operationStatus: 'idle',
        operationCommand: null,
        operationPackages: []
      })
    );

    observer.next(parseNpmAuditFixData(data));

    observer.next(
      toggleAuditLoader({
        loading: false,
        message: null
      })
    );
  })

  ipcRenderer.on('npm-audit-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmAudit$;
