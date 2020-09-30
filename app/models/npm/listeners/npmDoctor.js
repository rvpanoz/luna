import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';
import { setRunningCommand, parseNpmDoctorData } from 'models/npm/actions';
import {
  toggleDoctorLoader,
  // setActivePage,
  setSnackbar,
} from 'models/ui/actions';

const updateCommand = ({
  operationStatus,
  operationPackages,
  operationCommand,
}) => ({
  type: setRunningCommand.type,
  payload: {
    operationStatus,
    operationPackages,
    operationCommand,
  },
});

const onNpmDoctor$ = new Observable((observer) => {
  ipcRenderer.removeAllListeners(['npm-doctor-completed']);

  ipcRenderer.on('npm-doctor-completed', (event, data) => {
    observer.next(
      updateCommand({
        operationStatus: 'idle',
        operationCommand: null,
        operationPackages: [],
      })
    );

    observer.next(parseNpmDoctorData(data));
    // observer.next(setActivePage({ page: 'doctor', paused: true }));

    observer.next(
      setSnackbar({
        open: true,
        type: 'info',
        message: 'npm doctor completed',
      })
    );

    observer.next(
      toggleDoctorLoader({
        loading: false,
        message: null,
      })
    );
  });

  ipcRenderer.on('npm-doctor-error', (event, error) => {
    observer.error(error);
  });
});

export default onNpmDoctor$;
