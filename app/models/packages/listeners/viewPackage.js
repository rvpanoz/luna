/* eslint-disable no-underscore-dangle */

import { ipcRenderer } from 'electron';
import { togglePackageLoader } from 'models/ui/actions';
import { Observable } from 'rxjs';
import { pickBy } from 'ramda';
import { setActive } from '../actions';

const onViewPackage$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['view-close']);

  ipcRenderer.on('view-close', (event, status, cmd, data) => {
    try {
      const newActive = data && JSON.parse(data);
      const getCleanProps = (val, key) => /^[^_]/.test(key);
      const properties = pickBy(getCleanProps, newActive);

      observer.next(
        setActive({
          active: {
            ...properties,
            group: newActive.__group
          }
        })
      );

      observer.next(
        togglePackageLoader({
          loading: false
        })
      );
    } catch (error) {
      observer.error(error);
    }
  });
});

export default onViewPackage$;
