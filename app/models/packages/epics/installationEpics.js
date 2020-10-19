import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';
import { map, tap, concatMap, switchMap, ignoreElements } from 'rxjs/operators';

import { toggleLoader, setActivePage } from 'models/ui/actions';
import {
  installPackage,
  installPackageJson,
  installMultiplePackages,
  installPackageListener,
} from 'models/packages/actions';
import { iMessage } from 'commons/utils';
import { onNpmInstall$ } from '../listeners';

const updateLoader = (payload) => ({
  type: toggleLoader.type,
  payload,
});

const showInstallLoaderEpic = (action$) =>
  action$.pipe(
    ofType(
      installPackage.type,
      installPackageJson.type,
      installMultiplePackages.type
    ),
    concatMap(() => [
      setActivePage({
        page: 'packages',
        paused: true,
      }),
      updateLoader({
        loading: true,
        message: iMessage('info', 'installingPackages'),
      }),
    ])
  );

/**
 * Send ipc event to main process to handle npm-install for a single package
 * supports global and local mode
 */
const installPackageJsonEpic = (action$, state$) =>
  action$.pipe(
    ofType(installPackageJson.type),
    map(({ payload }) => {
      const {
        common: { mode, directory },
      } = state$.value;

      return {
        ...payload,
        mode,
        directory,
        packageJson: true,
      };
    }),
    tap((parameters) => ipcRenderer.send('npm-install', parameters)),
    ignoreElements()
  );

/**
 * Send ipc event to main process to handle npm-install for multiple packages
 * supports global and local mode
 */
const installMultiplePackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(installMultiplePackages.type),
    map(({ payload }) => {
      const { pkgOptions, selectedFromNotifications } = payload;

      const {
        common: {
          mode,
          directory,
          operations: { packagesInstallOptions },
        },
        ui: { selected },
      } = state$.value;

      const selectedPackages = selectedFromNotifications || selected;
      const options = selectedPackages.map((selectedPackage, idx) => {
        const pkg = packagesInstallOptions.find(
          (option) => option.name === selectedPackage
        );

        return pkg && pkg.options
          ? pkg.options
          : pkgOptions
          ? pkgOptions[idx]
          : ['save-prod'];
      });

      return {
        ...payload,
        pkgOptions: options,
        mode,
        directory,
      };
    }),
    tap((parameters) => ipcRenderer.send('npm-install', parameters)),
    ignoreElements()
  );

const installPackageListenerEpic = pipe(
  ofType(installPackageListener.type),
  switchMap(() => onNpmInstall$)
);

export {
  installPackageListenerEpic,
  installPackageJsonEpic,
  installMultiplePackagesEpic,
  showInstallLoaderEpic,
};
