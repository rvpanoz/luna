/* eslint-disable */

import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { toggleLoader, setSnackbar } from 'models/ui/actions';
import { switchcase, parseNpmAudit } from 'commons/utils';

const onNpmTools$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['tool-close']);

  ipcRenderer.on('tool-close', (event, errors, cliResult, command) => {
    const [tool] = command;

    const content = switchcase({
      audit: () => parseNpmAudit(cliResult)
    })(null)(tool);

    observer.next(
      toggleLoader({
        loading: false,
        message: null
      })
    );

    observer.next(
      setSnackbar({
        open: true,
        type: 'info',
        message: content
      })
    );
  });
});

export default onNpmTools$;
