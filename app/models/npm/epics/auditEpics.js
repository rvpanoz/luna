import { pipe } from 'rxjs';
import { map, tap, switchMap, ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { toggleAuditLoader } from 'models/ui/actions';
import {
  runAudit,
  npmAuditListener,
  parseNpmAuditData,
  updateNpmAuditData
} from 'models/npm/actions';

import { onNpmAudit$ } from '../listeners';

const updateLoader = payload => ({
  type: toggleAuditLoader.type,
  payload
});

const showAuditingLoaderEpic = action$ =>
  action$.pipe(
    ofType(runAudit.type),
    map(() =>
      updateLoader({
        loading: true,
        message: 'Please wait. npm audit is running..'
      })
    )
  );

const npmRunAuditEpic = (action$, state$) =>
  action$.pipe(
    ofType(runAudit.type),
    tap(({ payload }) => {
      const {
        common: { mode, directory }
      } = state$.value;

      ipcRenderer.send('npm-audit', {
        ...payload,
        mode,
        directory
      });
    }),
    ignoreElements()
  );

const npmAuditParseEpic = action$ =>
  action$.pipe(
    ofType(parseNpmAuditData.type),
    map(({ payload: data }) => {
      try {
        const dataToJson = JSON.parse(data);
        const { error } = dataToJson || {};

        if (error && typeof error === 'object') {
          const { code, summary, detail } = error || {};
          const summaryParts = summary && summary.split('\n');

          return updateNpmAuditData({
            data: {
              error: {
                summary: summaryParts && summaryParts[0],
                detail,
                code
              },
              content: null,
            }
          });
        }

        return updateNpmAuditData({
          data: {
            error: null,
            content: dataToJson
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    })
  );

const npmRunAuditListenerEpic = pipe(
  ofType(npmAuditListener.type),
  switchMap(() => onNpmAudit$)
);

export {
  npmRunAuditEpic,
  npmRunAuditListenerEpic,
  npmAuditParseEpic,
  showAuditingLoaderEpic
};
