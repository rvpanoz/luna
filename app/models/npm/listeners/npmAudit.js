import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { parseNpmAudit } from 'commons/utils';
import { setRunningCommand, updateNpmAuditData } from 'models/npm/actions';
import { setDialog, setActivePage } from 'models/ui/actions';

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

  ipcRenderer.on('npm-audit-completed', (event, data, errors) => {
    const content = parseNpmAudit(data);

    observer.next(
      updateCommand({
        operationStatus: 'idle',
        operationCommand: null,
        operationPackages: []
      })
    );

    observer.next(
      updateNpmAuditData({
        data: content
      })
    );

    observer.next(
      setActivePage({
        page: 'audit'
      })
    );
  });

  ipcRenderer.on('npm-audit-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmAudit$;