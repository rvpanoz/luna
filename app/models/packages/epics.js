import { pipe } from 'rxjs';
import {
  map,
  tap,
  filter,
  mergeMap,
  takeWhile,
  concatMap,
  withLatestFrom,
  ignoreElements
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { isPackageOutdated } from 'commons/utils';

import {
  toggleLoader,
  togglePackageLoader,
  setActivePage,
  setPage,
  clearSelected
} from 'models/ui/actions';

import { clearNotifications } from 'models/notifications/actions';
import { clearCommands, setRunningCommand } from 'models/npm/actions';

import {
  clearPackages,
  installPackages,
  updatePackages,
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  updateData,
  viewPackage
} from './actions';

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

const updatePackageLoader = payload => ({
  type: togglePackageLoader.type,
  payload
});

const setOutdated = payload => ({
  type: setOutdatedSuccess.type,
  payload
});

const setPackages = payload => ({
  type: setPackagesSuccess.type,
  payload
});

// TODO: :question

const ON = Symbol('ON');
const OFF = Symbol('OFF');

const isCommand = data => [ON, OFF].includes(data);

const onOff = (replay = false) => src$ =>
  src$.pipe(
    withLatestFrom(src$.pipe(filter(isCommand))),
    filter(([value, command]) => command === ON),
    map(([value]) => value),
    filter(data => !isCommand(data))
  );
/** ********* */

const packagesStartNpmListEpic = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesStart.type),
    mergeMap(({ payload: { channel, options } }) => {
      const {
        ui: { paused }
      } = state$.value;
      return [paused ? OFF : ON, { payload: { channel, options } }];
    }),
    onOff(),
    tap(({ payload: { channel, options } }) =>
      ipcRenderer.send(channel, options)
    ),
    ignoreElements()
  );

const packagesStartEpic = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesStart.type),
    mergeMap(({ payload: { channel, options } }) => {
      const {
        ui: { paused }
      } = state$.value;
      return [paused ? OFF : ON, {}];
    }),
    onOff(),
    concatMap(() => [
      updateLoader({
        loading: true,
        message: 'Loading packages..'
      }),
      clearCommands(),
      clearNotifications(),
      clearPackages()
    ])
  );

// const packagesStartEpic = (action$, state$) =>
//   action$.pipe(
//     ofType(setPackagesStart.type),
//     map(({ payload: { channel, options } }) => {
//       const {
//         ui: { paused }
//       } = state$.value;
//
//       if (paused) {
//         return { type: 'PAUSE_REQUEST' };
//       }
//
//       ipcRenderer.send(channel, options);
//
//       return { type: 'RESUME_REQUEST' };
//     }),
//     takeWhile(({ type }) => type === 'RESUME_REQUEST'),
//
//   );

const installPackagesEpic = pipe(
  ofType(installPackages.type),
  mergeMap(({ payload }) => {
    ipcRenderer.send('ipc-event', payload);

    return [
      updateLoader({
        loading: true,
        message: 'Installing packages..'
      }),
      setActivePage({
        page: 'packages',
        paused: false
      })
    ];
  })
);

const viewPackagesEpic = pipe(
  ofType(viewPackage.type),
  map(({ payload }) => {
    const { name } = payload;

    ipcRenderer.send('ipc-event', payload);

    return updatePackageLoader({
      loading: true,
      message: `Loading ${name}`
    });
  })
);

const updatePackagesEpic = pipe(
  ofType(updatePackages.type),
  mergeMap(({ payload }) => {
    const { ipcEvent, packages, name } = payload;

    ipcRenderer.send('ipc-event', payload);

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
        message: 'Updating packages..'
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

// TODO: :question
const packagesSuccessEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateData.type),
    takeWhile(({ payload: { dependencies } }) => Array.isArray(dependencies)),
    map(
      ({
        payload: {
          dependencies,
          outdated,
          projectName,
          projectVersion,
          projectDescription
        }
      }) => {
        const enhancedDependencies = dependencies
          .filter(dependency => dependency && typeof dependency === 'object')
          .reduce((deps = [], dependency) => {
            const {
              name,
              invalid,
              extraneous,
              peerMissing,
              problems,
              missing,
              ...rest
            } = dependency;

            if (!invalid && !peerMissing) {
              const [isOutdated, outdatedPkg] = isPackageOutdated(
                outdated,
                name
              );

              const enhancedDependency = {
                ...rest,
                name,
                extraneous,
                missing,
                peerMissing,
                latest: isOutdated ? outdatedPkg.latest : null,
                isOutdated
              };

              deps.push(enhancedDependency);
            }

            return deps;
          }, []);

        return {
          dependencies: enhancedDependencies,
          outdated,
          projectName,
          projectVersion,
          projectDescription
        };
      }
    ),
    concatMap(
      ({
        dependencies,
        outdated,
        projectName,
        projectVersion,
        projectDescription
      }) => {
        const {
          ui: { page },
          packages: {
            metadata: { fromSearch, fromSort }
          }
        } = state$.value;

        const actions = [];

        if (page !== 0) {
          actions.unshift(setPage({ page: 0 }));
        }

        if (dependencies.length) {
          actions.push(
            updateLoader({
              loading: false,
              message: null
            })
          );
        }

        return [
          setPackages({
            projectName,
            projectVersion,
            projectDescription,
            fromSearch,
            fromSort,
            dependencies
          }),
          setOutdated({ outdated }),
          ...actions
        ];
      }
    )
  );

const takeX = (action$, state$) =>
  action$.pipe(
    ofType(t1, t2),
    switchMap(() => {
      ipcRenderer.removeAllListeners();

      return new Observable(observer => {
        ipcRenderer.on(`${ipcEvent}-close`, (event, status, cmd, data) => {
          if (!data || !isJson(data)) {
            return;
          }

          const [command] = cmd;
          const [
            packages,
            errors,
            projectName,
            projectVersion,
            projectDescription
          ] = parseDependencies(data, mode, directory, cmd);

          if (errors) {
            setErrors(errors);
          }

          setProject({
            projectName,
            projectVersion,
            projectDescription
          });

          switchcase({
            list: () =>
              observer.next(
                setDependencies({
                  data: packages,
                  projectName,
                  projectVersion,
                  projectDescription
                })
              ),
            outdated: () => observer.next(setOutdated({ data: packages }))
          })('list')(command);
        });
      });
    })
  );

export default combineEpics(
  packagesStartEpic,
  packagesSuccessEpic,
  packagesStartNpmListEpic,
  installPackagesEpic,
  updatePackagesEpic,
  viewPackagesEpic
);
