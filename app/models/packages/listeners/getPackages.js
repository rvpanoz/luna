import { ipcRenderer } from 'electron';
import { toggleLoader } from 'models/ui/actions';
import { updateNotifications } from 'models/notifications/actions';
import { Observable } from 'rxjs';
import { pick } from 'ramda';
import { switchcase, objectEntries, isJson } from 'commons/utils';
import { mapPackages, setOutdatedSuccess } from '../actions';

const onGetPackages$ = new Observable(observer => {
  // remove listener
  ipcRenderer.removeAllListeners(['get-packages-close']);

  // register listener
  ipcRenderer.on('get-packages-close', (event, status, cmd, response) => {
    if (!response || !isJson(response)) {
      return;
    }

    const [command] = cmd;

    try {
      const packageData = JSON.parse(response);
      const { name, version, description } = packageData || {};
      const packages = pick(['dependencies', 'problems'], packageData);
      const { dependencies, problems } = packages || {};

      const dataArray = dependencies
        ? objectEntries(dependencies)
        : objectEntries(packageData);

      if (problems) {
        observer.next(
          updateNotifications({
            notifications: problems
          })
        );
      }

      switchcase({
        list: () => {
          observer.next(
            mapPackages({
              data: dataArray,
              projectName: name,
              projectVersion: version,
              projectDescription: description
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
              outdated: dataArray
            })
          )
      })('list')(command);
    } catch (error) {
      observer.error({ type: 'APP_ERROR' });
    }
  });
});

export default onGetPackages$;
