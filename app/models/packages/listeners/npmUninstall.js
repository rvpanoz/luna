import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { setSnackbar } from 'models/ui/actions'
import { removePackages } from '../actions';

const onNpmUninstall$ = new Observable(observer => {
    ipcRenderer.removeAllListeners(['npm-uninstall-completed']);

    ipcRenderer.on('npm-uninstall-completed', (event, resultMessage, errors, packages) => {
        observer.next(
            removePackages({ removedPackages: packages })
        );

        observer.next(
            setSnackbar({
                open: true,
                type: 'info',
                message: resultMessage
            })
        );
    });

    ipcRenderer.on('npm-uninstall-error', (event, error) => {
        observer.error(error);
    });
});

export default onNpmUninstall$;
