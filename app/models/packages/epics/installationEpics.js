/* eslint-disable no-nested-ternary */

import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';
import { map, tap, switchMap, ignoreElements } from 'rxjs/operators';

import { toggleLoader } from 'models/ui/actions';
import {
  installPackage,
  installMultiplePackages,
  installPackageListener
} from 'models/packages/actions';
import { iMessage } from 'commons/utils';
import { onNpmInstall$ } from '../listeners';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const showInstallLoaderEpic = action$ =>
  action$.pipe(
    ofType(installPackage.type, installMultiplePackages.type),
    map(() =>
      updateLoader({
        loading: true,
        message: iMessage('info', 'installingPackages')
      })
    )
  );

/**
 * Send ipc event to main process to handle npm-install for a single package
 * supports global and local mode
 */
const installPackageEpic = (action$, state$) =>
  action$.pipe(
    ofType(installPackage.type),
    tap(({ payload }) => {
      const { name } = payload;
      const {
        common: {
          mode,
          directory,
          operations: { packagesInstallOptions }
        }
      } = state$.value;

      const options = packagesInstallOptions.find(
        option => option.name === name
      );

      const parameters = {
        ...payload,
        name,
        pkgOptions: options ? options.options : ['--save-prod'],
        mode,
        directory
      };

      ipcRenderer.send('npm-install', parameters);
    }),
    ignoreElements()
  );

/**
 * Send ipc event to main process to handle npm-install for multiple packages
 * supports global and local mode
 */
const installMultiplePackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(installMultiplePackages.type),
    tap(({ payload }) => {
      const {
        common: {
          mode,
          directory,
          operations: { packagesInstallOptions }
        },
        ui: { selected }
      } = state$.value;

      const options = selected.map(selectedPackage => {
        const pkg = packagesInstallOptions.find(
          option => option.name === selectedPackage
        );

        return pkg && pkg.options ? pkg.options : ['save-prod'];
      });

      const parameters = {
        ...payload,
        pkgOptions: options,
        mode,
        directory
      };

      ipcRenderer.send('npm-install', parameters);
    }),
    ignoreElements()
  );

const installPackageListenerEpic = pipe(
  ofType(installPackageListener.type),
  switchMap(() => onNpmInstall$)
);

export {
  installPackageListenerEpic,
  installPackageEpic,
  installMultiplePackagesEpic,
  showInstallLoaderEpic
};
