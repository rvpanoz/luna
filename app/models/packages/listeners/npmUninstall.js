import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { setSnackbar } from 'models/ui/actions'
import { removePackages } from '../actions';

const onNpmUninstall$ = new Observable(observer => {
    ipcRenderer.removeAllListeners(['npm-uninstall-completed']);

    ipcRenderer.on('npm-uninstall-completed', (event, errors, data) => {
        console.log(data)

        // const removedOrUpdatedPackages =
        //     options &&
        //     options.filter(
        //         option =>
        //             option.indexOf(operation) === -1 &&
        //             option.indexOf(argv) === -1 &&
        //             option.indexOf('-g') === -1
        //     );

        // if (removedOrUpdatedPackages && removedOrUpdatedPackages.length) {
        //     observer.next(
        //         removePackages({ removedPackages: removedOrUpdatedPackages })
        //     );

        //     observer.next(
        //         setSnackbar({
        //             open: true,
        //             type: errorMessages.length ? 'error' : 'info',
        //             message: errorMessages.length
        //                 ? `Packages removed with errors \n${errorMessages[1]}\n${
        //                 errorMessages[2]
        //                 }`
        //                 : cliMessage
        //         })
        //     );
        // }
    });

    ipcRenderer.on('npm-uninstall-error', (event, error) => {
        observer.error(error);
    });
});

export default onNpmUninstall$;
