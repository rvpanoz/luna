import path from 'path';
import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { toggleLoader, setSnackbar } from 'models/ui/actions';
import { setMode } from 'models/common/actions';
// import { switchcase, parseNpmAudit } from 'commons/utils';

const onNpmTools$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['tool-close']);

  ipcRenderer.on('tool-close', (event, errors, cliResult, command) => {
    /* eslint-disable-next-line */
    const [operation, parameters, directory] = command;

    // const content = switchcase({
    //   audit: () => parseNpmAudit(cliResult),
    //   init: () => cliResult
    // })(null)(operation);

    observer.next(
      toggleLoader({
        loading: false,
        message: null
      })
    );

    if (operation === 'init' && directory) {
      observer.next(
        setMode({
          mode: 'local',
          directory: path.join(directory, 'package.json')
        })
      );
    }

    observer.next(
      setSnackbar({
        open: true,
        type: 'info',
        message: `npm ${operation} completed`
      })
    );
  });
});

export default onNpmTools$;
