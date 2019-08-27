import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { pick } from 'ramda';
import { toggleLoader, setPage, setSnackbar } from 'models/ui/actions';
import { addNotification } from 'models/notifications/actions';
import { switchcase, objectEntries } from 'commons/utils';
import { mapPackages, mapOutdatedPackages } from '../actions';

const onListOutdatedPackages$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-list-outdated-completed']);

  const onComplete = (event, ...rest) => {
    const [data, , options] = rest;
    const [command] = options;

    if (!data || data.length === 0) {
      return;
    }

    try {
      const packageData = JSON.parse(data);
      const { name, version, description } = packageData || {};
      const packages = pick(['dependencies', 'problems'], packageData);
      const { dependencies, problems: notifications } = packages || {};

      const dataArray = dependencies
        ? objectEntries(dependencies)
        : objectEntries(packageData);

      console.log(notifications)
      if (notifications && Array.isArray(notifications)) {
        notifications.forEach(notification => observer.next(addNotification(notification)));
      }

      const noDependencies = dataArray.every(dep =>
        dep && dep[1] ? typeof dep[1] !== 'object' : false
      );

      switchcase({
        list: () => {
          observer.next(
            mapPackages({
              data: noDependencies ? [] : dataArray,
              projectName: name,
              projectVersion: version,
              projectDescription: description
            })
          );

          observer.next(setPage({
            page: 0
          }));

          observer.next(
            toggleLoader({
              loading: false
            })
          );

          observer.next(setSnackbar({
            open: false,
            type: 'info',
            message: null
          }))
        },
        outdated: () => {
          observer.next(
            mapOutdatedPackages({
              data: noDependencies ? [] : dataArray
            })
          );
        }
      })('list')(command);
    } catch (error) {
      observer.error(error);
    }
  };

  // register listener
  ipcRenderer.on('npm-list-outdated-completed', onComplete);
});

export default onListOutdatedPackages$;
