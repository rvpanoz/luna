import { ipcRenderer } from 'electron';
import { toggleLoader } from 'models/ui/actions';
import { Observable } from 'rxjs';
import { parseFromSearch } from 'commons/utils';
import { mapPackages } from '../actions';

const onSearchPackages$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['search-packages-close']);
  ipcRenderer.on(
    'search-packages-close',
    (event, status, commandArgs, data) => {
      const [packages] = parseFromSearch(data) || [];

      observer.next(
        mapPackages({
          data: packages,
          fromSearch: true
        })
      );

      observer.next(
        toggleLoader({
          loading: false
        })
      );
    }
  );
});

export default onSearchPackages$;
