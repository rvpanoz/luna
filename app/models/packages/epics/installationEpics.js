/* eslint-disable no-nested-ternary */

import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { pipe, of, from } from 'rxjs';
import { tap, map, mergeMap, switchMap, ignoreElements } from 'rxjs/operators';

import { toggleLoader, setActivePage } from 'models/ui/actions';
import {
  installPackage,
  installMultiplePackages,
  installPackageListener,
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
    mergeMap(() => [
      setActivePage({
        page: 'packages',
        paused: true
      }),
      updateLoader({
        loading: true,
        message: iMessage('info', 'installingPackages')
      })
    ])
  );

/**
 * Send ipc event to main process to handle npm-install for a single package
 * supports global and local mode
 */
const installPackageEpic = (action$, state$) =>
  action$.pipe(
    ofType(installPackage.type),
    tap(({ payload }) => {
      const { name, pkgOptions } = payload;
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
        pkgOptions: options ? options.options : pkgOptions || ['save-prod'],
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
      const { pkgOptions } = payload;

      const {
        common: {
          mode,
          directory,
          operations: { packagesInstallOptions }
        },
        ui: { selected }
      } = state$.value;

      const options = selected.map((selectedPackage, idx) => {
        const pkg = packagesInstallOptions.find(
          option => option.name === selectedPackage
        );

        return pkg && pkg.options
          ? pkg.options
          : pkgOptions
            ? pkgOptions[idx]
            : ['save-prod'];
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
  showInstallLoaderEpic,
};
