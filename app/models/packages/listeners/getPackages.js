import { ipcRenderer } from 'electron';
import { toggleLoader } from 'models/ui/actions';
import { updateNotifications } from 'models/notifications/actions';
import { Observable } from 'rxjs';
import { pick } from 'ramda';
import { switchcase, objectEntries, isJson } from 'commons/utils';
import { mapPackages, setOutdatedSuccess } from '../actions';

const onGetPackages$ = new Observable(observer => {
  const listener = () => {
    console.log(response);
    if (!response || !isJson(response)) {
      return;
    }

    const command = 'list';

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
            setOutdatedSuccess({
              outdated: dataArray.map(arr => {
                const [pkgName, details] = arr;

                return {
                  name: pkgName,
                  ...details
                };
              })
            })
          )
      })('list')(command);
    } catch (error) {
      observer.error(error);
    }
  };

  // ipcRenderer.removeListener('npm-list-completed', () => console.log(1));
  ipcRenderer.once('npm-list-completed', (event, response) => listener);
});

export default onGetPackages$;
