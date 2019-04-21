import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const onNpmCommand$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['on-command-flow']);

  ipcRenderer.on('on-command-flow', (event, message) => {
    observer.next(message);
  });
});

export default onNpmCommand$;
