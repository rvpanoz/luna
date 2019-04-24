import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

const onNpmCommand$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['on-command-flow']);

  ipcRenderer.on('on-command-flow', (event, message) => {
    observer.next(message);
  });
});

export default onNpmCommand$;
