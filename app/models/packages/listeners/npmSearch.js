import { ipcRenderer } from 'electron';
import { toggleLoader } from 'models/ui/actions';
import { Observable } from 'rxjs';
import { parseFromSearch } from 'commons/utils';
import { mapPackages } from '../actions';

const onSearchPackages$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-search-completed']);

  ipcRenderer.on('npm-search-completed', (event, data) => {
    try {
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
    } catch (error) {
      observer.error(error);
    }
  });
});

export default onSearchPackages$;
