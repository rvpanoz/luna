import { pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import {
  listOutdatedPackagesListener,
  searchPackagesListener,
  viewPackageListener,
  installPackageListener,
  uninstallPackagesListener,
} from 'models/packages/actions';

import { npmToolsListener } from 'models/npm/actions';
import { initActions } from 'models/common/actions';

/**
 * Register listeners - actions
 */

const onInitActionsEpic = pipe(
  ofType(initActions.type),
  mergeMap(() => [
    listOutdatedPackagesListener(),
    searchPackagesListener(),
    viewPackageListener(),
    installPackageListener(),
    uninstallPackagesListener(),
    npmToolsListener()
  ])
);

export default combineEpics(onInitActionsEpic);
