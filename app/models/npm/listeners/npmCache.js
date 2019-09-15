import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { setRunningCommand, parseNpmCacheData } from 'models/npm/actions';
import { setSnackbar, toggleLoader } from 'models/ui/actions';

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

const onNpmCache$ = new Observable(observer => {
    ipcRenderer.removeAllListeners(['npm-cache-completed']);

    ipcRenderer.on('npm-cache-completed', (event, errors, data, action) => {
        // TODO: npm cache errors
        if (errors) {
            console.error(errors)
        }

        observer.next(parseNpmCacheData(data));

        observer.next(
            updateCommand({
                operationStatus: 'idle',
                operationCommand: null,
                operationPackages: []
            })
        );

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
                message: `npm cache ${action} completed`
            })
        );
    });

    ipcRenderer.on('npm-cache-error', (event, error) => {
        observer.error(error);
    });
});

export default onNpmCache$;
