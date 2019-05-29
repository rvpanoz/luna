import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
// import { parseNpmAudit } from 'commons/utils';

const onNpmAudit$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-audit-completed']);

  ipcRenderer.on('npm-audit-completed', (event, data, errors) => {
    console.log(data, errors);
  });

  ipcRenderer.on('npm-audit-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmAudit$;
