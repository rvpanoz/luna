import { pipe } from 'rxjs';
import { mergeMap, tap, map, ignoreElements } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import {
  installPackage,
  installMultiplePackages,
  uninstallPackages,
  updatePackages,
  listOutdatedPackagesListener,
  searchPackagesListener,
  viewPackageListener,
  installPackageListener,
  updatePackagesListener,
  uninstallPackagesListener
} from 'models/packages/actions';
import { clearSelected, setSnackbar } from 'models/ui/actions';
import {
  addActionError,
  setRunningCommand,
  npmAuditListener,
  npmDoctorListener,
  npmInitListener,
  npmDedupeListener,
  npmCacheListener,
  runDedupe,
  runDoctor,
  runAudit,
  runInit,
  runCache
} from 'models/npm/actions';
import { initActions } from 'models/common/actions';

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

const updateSnackbar = ({ type, position, message, open, hideOnClose }) => ({
  type: setSnackbar.type,
  payload: {
    open,
    type,
    position,
    message,
    hideOnClose
  }
})

const addActionErrorEpic = pipe(
  ofType(addActionError.type),
  tap(({ payload }) => {
    const { error } = payload;

    return error.split('npm ERR!');
  }),
  map(errorsArr =>
    errorsArr.map(errorLine => {
      const notEmptyLine = errorLine.trim().length > 1;

      return notEmptyLine && errorLine.indexOf('fatal') > 0 ? errorLine : '';
    })
  ),
  ignoreElements()
);

const updateCommandEpic = pipe(
  ofType(
    installPackage.type,
    installMultiplePackages.type,
    updatePackages.type,
    uninstallPackages.type,
    runAudit.type,
    runDoctor.type,
    runInit.type,
    runDedupe.type,
    runCache.type
  ),
  mergeMap(({ payload }) => {
    const { packages, cmd } = payload || {};
    const [runningCommand] = cmd;

    return [
      updateSnackbar({
        open: true,
        type: 'warning',
        message: `running npm ${runningCommand}`,
        hideOnClose: true
      }),
      updateCommand({
        operationStatus: 'running',
        operationCommand: runningCommand,
        operationPackages: Array.isArray(packages) ? packages : []
      }),
      clearSelected()
    ];
  })
);

/**
 * Register listeners for npm operations
 * This has to be done for every listener.
 */

const onInitActionsEpic = pipe(
  ofType(initActions.type),
  mergeMap(() => [
    listOutdatedPackagesListener(),
    searchPackagesListener(),
    viewPackageListener(),
    installPackageListener(),
    updatePackagesListener(),
    uninstallPackagesListener(),
    npmAuditListener(),
    npmDoctorListener(),
    npmInitListener(),
    npmDedupeListener(),
    npmCacheListener()
  ])
);

export default combineEpics(
  addActionErrorEpic,
  onInitActionsEpic,
  updateCommandEpic
);
