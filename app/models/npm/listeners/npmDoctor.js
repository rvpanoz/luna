import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { parseNpmDoctor } from 'commons/utils';
import { setRunningCommand, updateNpmDoctorData } from 'models/npm/actions';
import { toggleLoader } from 'models/ui/actions';

const updateCommand = ({
  operationStatus,
  operationPackages,
  operationCommand
}) => ({
  type: setRunningCommand.type,
  payload: {
    operationStatus,
    operationPackages,
    operationCommand
  }
});

const onNpmDoctor$ = new Observable(observer => {
  ipcRenderer.removeAllListeners(['npm-doctor-completed']);

  ipcRenderer.on('npm-doctor-completed', (event, data, errors) => {
    const content = parseNpmDoctor(data);

    observer.next(
      updateCommand({
        operationStatus: 'idle',
        operationCommand: null,
        operationPackages: []
      })
    );

    observer.next(
      updateNpmDoctorData({
        data: content
      })
    );

    observer.next(
      toggleLoader({
        loading: false
      })
    );
  });

  ipcRenderer.on('npm-doctor-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmDoctor$;
