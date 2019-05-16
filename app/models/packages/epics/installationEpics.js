/* eslint-disable */

import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';
import { map, tap, mergeMap, switchMap, ignoreElements } from 'rxjs/operators';

import { setActivePage, clearSelected, toggleLoader } from 'models/ui/actions';
import { setRunningCommand } from 'models/npm/actions';
import {
  addInstallationOption,
  installPackage,
  installPackageListener,
  updatePackages
} from 'models/packages/actions';

import { onNpmInstall$ } from '../listeners';

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

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const showLoaderEpic = action$ =>
  action$.pipe(
    ofType(installPackage.type),
    map(({ payload }) => {
      const { name } = payload;

      return updateLoader({
        loading: true,
        message: `Installing ${name}`
      });
    })
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

const installMultiplePackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(installMultiplePackages.type),
    withLatestFrom(state$)
  );

const installMultiplePackagesFromGlobalEpic = (action$, state$) =>
  action$.pipe(
    ofType(installMultiplePackages.type),
    withLatestFrom(state$),
    filter(
      ([
        ,
        {
          common: { mode }
        }
      ]) => mode === 'global'
    ),
    map(() =>
      prepareInstallationOptions({
        from: 'global',
        options: []
      })
    )
  );

const installMultiplePackagesFromLocalEpic = (action$, state$) =>
  action$.pipe(
    ofType(installMultiplePackages.type),
    withLatestFrom(state$),
    filter(
      ([
        ,
        {
          common: { mode }
        }
      ]) => mode === 'local'
    ),
    map(({ payload }) => {
      console.log(payload);

      return prepareInstallationOptions({
        from: 'flags',
        options: []
      });
    })
  );

const prepareInstallEpic = (action$, state$) =>
  action$.pipe(
    ofType(prepareInstall.type),
    switchMap(({ from, options }) => {
      const {
        ui: { selected }
      } = state$.value;

      selected.map(selectedPackage => {
        let details;

        if (from === 'json') {
          details = options.filter(option => {
            const [, dependencies] = option;

            return dependencies[selectedPackage];
          });

          const [group] = details;

          return addInstallationOptionAction({
            name: selectedPackage,
            options: group ? [].concat(PACKAGE_GROUPS[group]) : []
          });
        }

        if (from === 'flags') {
          return addInstallationOptionAction({
            name: selectedPackage,
            options: options
              ? options.find(option => option.name === selectedPackage).options
              : []
          });
        }

        return addInstallationOptionAction({
          name: selectedPackage,
          options: []
        });
      });
    })
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
        cmd: options.mapt(() => 'install'),
        packages: selected,
        pkgOptions: mergedOptions,
        multiple: true,
        mode,
        directory
      };

      ipcRenderer.send('npm-install', parameters);

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

// listener epics
const installPackageListenerEpic = pipe(
  ofType(installPackageListener.type),
  switchMap(() => onNpmInstall$)
);

export {
  installPackageListenerEpic,
  installPackageEpic,
  installMultiplePackagesFromGlobalEpic,
  installMultiplePackagesFromLocalEpic,
  prepareInstallEpic,
  completeInstallationEpic,
  updatePackagesEpic,
  showLoaderEpic
};
