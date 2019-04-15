import { Observable } from 'rxjs';
import { ipcRenderer } from 'electron';

class RxIpc {
  listeners = [];
  addListener: () => {};
  removeListener: () => {};
}

export default RxIpc;
