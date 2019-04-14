import { ipcRenderer } from 'electron';
import { toggleLoader } from 'models/ui/actions';
import { updateNotifications } from 'models/notifications/actions';
import { Observable } from 'rxjs';
import { switchcase, parseDependencies, isJson } from 'commons/utils';
import { mapPackages, setOutdatedSuccess } from '../actions';

const onGetPackages$ = options =>
  new Observable(observer => {
    const { mode, directory } = options || {};

    ipcRenderer.removeAllListeners(['get-packages-close']);
    ipcRenderer.on('get-packages-close', (event, status, cmd, data) => {
      if (!data || !isJson(data)) {
        return;
      }

      const [command] = cmd;
      const [
        packages,
        errors,
        projectName,
        projectVersion,
        projectDescription
      ] = parseDependencies(data, mode, directory, cmd);

      if (errors) {
        observer.next(
          updateNotifications({
            notifications: errors
          })
        );
      }

      switchcase({
        list: () => {
          observer.next(
            mapPackages({
              dependencies: packages,
              projectName,
              projectVersion,
              projectDescription
            })
          );

          observer.next(
            toggleLoader({
              loading: false
            })
          );
        },
        outdated: () =>
          observer.next(
            setOutdatedSuccess({
              outdated: packages
            })
          )
      })('list')(command);
    });
  });

export default onGetPackages$;
