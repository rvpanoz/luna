import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { switchcase, parseNpmAudit } from 'commons/utils';

const onNpmTools$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['tool-close']);

  ipcRenderer.on('tool-close', (event, errors, cliResult, command) => {
    /* eslint-disable-next-line */
    const [operation, parameters, directory] = command;

    const content = switchcase({
      audit: () => parseNpmAudit(cliResult),
      init: () => cliResult
    })(null)(operation);

    const { error, message } = content;

    if (error) {
      observer.error(message);
    }

    if (operation === 'init' && directory) {
      observer.next({
        operation: 'init',
        directory
      });
    }

    if (operation === 'audit') {
      const { fix } = content;

      if (fix) {
        observer.next(content);
      } else {
        observer.next({
          operation,
          content
        });
      }
    }
  });
});

export default onNpmTools$;
