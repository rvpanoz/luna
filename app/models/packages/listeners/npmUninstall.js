import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { setPackagesStart } from '../actions';

const onNpmUninstall$ = new Observable(observer => {
    ipcRenderer.removeAllListeners(['npm-uninstall-completed']);

    ipcRenderer.on('npm-uninstall-completed', () => {
        try {
            observer.next(
                setPackagesStart({
                    channel: 'npm-uninstall',
                    options: {
                        cmd: ['uninstall']
                    }
                })
            );
        } catch (error) {
            observer.error(error);
        }
    });

    ipcRenderer.on('npm-uninstall-error', (event, error) => {
        observer.error(error);
    });
});

export default onNpmUninstall$;
