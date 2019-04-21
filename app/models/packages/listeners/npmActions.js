import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { clearInstallOptions } from 'models/common/actions';
import { toggleLoader, clearSelected, setSnackbar } from 'models/ui/actions';
import { removePackages, setPackagesStart } from 'models/packages/actions';
import { clearRunningCommand } from 'models/npm/actions';

const onNpmActions$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['action-close']);

  ipcRenderer.on('action-close', (event, output, cliMessage, options) => {
    try {
      const [operation, argv] = options;
      const errorMessages = [];

      observer.next(clearRunningCommand());
      observer.next(clearSelected());

      if (output && typeof output === 'string') {
        const outputParts = output.split('\n');

        errorMessages.concat(
          outputParts.filter(outputPart => outputPart.indexOf('npm ERR!') === 0)
        );
      }

      if (operation === 'uninstall') {
        const removedOrUpdatedPackages =
          options &&
          options.filter(
            option =>
              option.indexOf(operation) === -1 &&
              option.indexOf(argv) === -1 &&
              option.indexOf('-g') === -1
          );

        if (removedOrUpdatedPackages && removedOrUpdatedPackages.length) {
          observer.next(
            removePackages({ removedPackages: removedOrUpdatedPackages })
          );

          observer.next(
            setSnackbar({
              open: true,
              type: errorMessages.length ? 'error' : 'info',
              message: errorMessages.length
                ? `Packages removed with errors \n${errorMessages[1]}\n${
                    errorMessages[2]
                  }`
                : cliMessage
            })
          );
        }

        return;
      }

      // clean up
      observer.next(clearInstallOptions());

      observer.next(
        toggleLoader({
          loading: false,
          message: null
        })
      );

      observer.next(
        setPackagesStart({
          channel: 'ipc-event',
          options: {
            ipcEvent: 'get-packages',
            cmd: ['outdated', 'list']
          }
        })
      );
    } catch (error) {
      observer.error(error);
    }
  });
});

export default onNpmActions$;
