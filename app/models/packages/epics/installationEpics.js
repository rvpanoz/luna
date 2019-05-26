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
        message: `Installing packages..`
      })
    )
  );

/**
 * Install single package
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
 *  Install multiple packages
 *  supports global and local mode
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

      const options = packagesInstallOptions
        ? packagesInstallOptions.map(opt => opt.options)
        : [];

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

// listener epics
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
