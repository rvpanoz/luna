import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { setRunningCommand } from 'models/npm/actions';
import { setSnackbar } from 'models/ui/actions';

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

const onNpmDedupe$ = new Observable(observer => {
    ipcRenderer.removeAllListeners(['npm-dedupe-completed']);

    ipcRenderer.on('npm-dedupe-completed', (event, data) => {

        observer.next(
            updateCommand({
                operationStatus: 'idle',
                operationCommand: null,
                operationPackages: []
            })
        );

        observer.next(
            setSnackbar({
                open: true,
                type: 'info',
                message: 'npm dedupe completed'
            })
        );
    });

    ipcRenderer.on('npm-dedupe-error', (event, error) => {
        observer.error(error);
    });
});

export default onNpmDedupe$;
