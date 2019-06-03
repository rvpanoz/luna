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
        message: 'Installing packages...'
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
      const {
        common: { mode, directory }
      } = state$.value;

      ipcRenderer.send(
        'npm-install',
        Object.assign({}, payload, {
          mode,
          directory
        })
      );
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
        }
      } = state$.value;

      const { cmd, multiple, packages, ipcEvent, pkgOptions } = payload;
      const options = Array.isArray(pkgOptions)
        ? pkgOptions
        : packagesInstallOptions
        ? packagesInstallOptions.map(opt => opt.options)
        : [];

      const parameters = {
        ipcEvent,
        cmd,
        multiple,
        packages,
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
