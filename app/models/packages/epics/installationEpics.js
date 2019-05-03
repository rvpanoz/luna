import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { map, tap, mergeMap } from 'rxjs/operators';

import { setActivePage, clearSelected, toggleLoader } from 'models/ui/actions';
import { setRunningCommand } from 'models/npm/actions';
import {
  addInstallationOption,
  installPackages,
  updatePackages
} from 'models/packages/actions';

import MESSAGES from '../messages';

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

const IPC_EVENT = 'ipc-event';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const installPackagesEpic = action$ =>
  action$.pipe(
    ofType(installPackages.type),
    tap(console.log)
  );

const completeInstallationEpic = (action$, state$) =>
  action$.pipe(
    ofType(addInstallationOption.type),
    map(commandOptions => {
      const {
        ui: { selected },
        common: { mode, directory }
      } = state$.value;

      const options = commandOptions.map(opt => opt.options);
      const mergedOptions = [].concat(options);

      const parameters = {
        ipcEvent: 'install',
        cmd: options.map(() => 'install'),
        packages: selected,
        pkgOptions: mergedOptions,
        multiple: true,
        mode,
        directory
      };

      ipcRenderer.send(IPC_EVENT, parameters);

      return updateLoader({
        loading: true,
        message: MESSAGES.install
      });
    })
  );

const updatePackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(updatePackages.type),
    mergeMap(({ payload }) => {
      const {
        common: { mode, directory }
      } = state$.value;
      const { ipcEvent, packages, name } = payload;

      ipcRenderer.send(
        IPC_EVENT,
        Object.assign({}, payload, {
          mode,
          directory
        })
      );

      if (ipcEvent === 'uninstall') {
        return [
          updateCommand({
            operationStatus: 'running',
            operationCommand: ipcEvent,
            operationPackages: packages && packages.length ? packages : [name]
          }),
          {
            type: clearSelected.type
          }
        ];
      }

      return [
        updateLoader({
          loading: true,
          message: MESSAGES.update
        }),
        setActivePage({
          page: 'packages',
          paused: false
        }),
        updateCommand({
          operationStatus: 'running',
          operationCommand: ipcEvent,
          operationPackages: packages && packages.length ? packages : [name]
        })
      ];
    })
  );

export { completeInstallationEpic, installPackagesEpic, updatePackagesEpic };
