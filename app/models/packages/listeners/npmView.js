import { ipcRenderer } from 'electron';
import { togglePackageLoader } from 'models/ui/actions';
import { Observable } from 'rxjs';
import { pickBy } from 'ramda';

import { setActive } from '../actions';
import { setActiveNotification } from '../../notifications/actions';

const onViewPackage$ = new Observable((observer) => {
  ipcRenderer.removeAllListeners(['npm-view-completed']);

  ipcRenderer.on('npm-view-completed', (event, errors, data, options) => {
    const { notification } = options;

    try {
      const newActive = data ? JSON.parse(data) : null;
      const getCleanProps = (val, key) => /^[^_]/.test(key);
      const properties = pickBy(getCleanProps, newActive);

      if (notification) {
        observer.next(
          setActiveNotification({
            active: {
              ...properties,
            },
          })
        );

        return;
      }

      observer.next(
        setActive({
          active: {
            ...properties,
            group: newActive ? newActive.__group || '' : '',
          },
        })
      );

      observer.next(
        togglePackageLoader({
          loading: false,
        })
      );
    } catch (error) {
      observer.error(error);
    }
  });
});

export default onViewPackage$;
