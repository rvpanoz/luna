import { ipcRenderer } from 'electron';
import { toggleLoader } from 'models/ui/actions';
import { updateNotifications } from 'models/notifications/actions';
import { Observable } from 'rxjs';
import { pick } from 'ramda';
import { switchcase, objectEntries } from 'commons/utils';
import { mapPackages, mapOutdatedPackages } from '../actions';

const onListOutdatedPackages$ = new Observable(observer => {
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

          observer.next(
            toggleLoader({
              loading: false
            })
          );
        },
        outdated: () =>
          observer.next(
            mapOutdatedPackages({
              data: noDependencies ? [] : dataArray
            })
          )
      })('list')(command);
    } catch (error) {
      observer.error(error);
    }
  };

  /* eslint-disable-next-line */
  const onFlow = (event, ...rest) => {
    // TODO: handle this
  };

  // clean up listeners
  ipcRenderer.removeListener('npm-list-outdated-completed', onComplete);
  ipcRenderer.removeListener('npm-list-outdated-flow', onFlow);

  // register listeners
  ipcRenderer.on('npm-list-outdated-flow', onFlow);
  ipcRenderer.on('npm-list-outdated-completed', onComplete);
});

export default onListOutdatedPackages$;
