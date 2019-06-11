import { pipe } from 'rxjs';
import { map, tap, switchMap, ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';

import { parseNpmAudit } from 'commons/utils';
import { toggleLoader } from 'models/ui/actions';
import { runAudit, npmAuditListener, parseNpmAuditData, updateNpmAuditData } from 'models/npm/actions';

import { onNpmAudit$ } from '../listeners';

const updateLoader = payload => ({
  type: toggleLoader.type,
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

// TODO: use fix options
const npmRunAuditEpic = (action$, state$) =>
  action$.pipe(
    ofType(runAudit.type),
    tap(({ payload }) => {
      const {
        common: { mode, directory }
      } = state$.value;

      // const { fix } = payload;

      ipcRenderer.send('npm-audit', {
        ...payload,
        mode,
        directory
      });
    }),
    ignoreElements()
  );

const npmAuditParseEpic = action$ => action$.pipe(
  ofType(parseNpmAuditData.type),
  map(({ payload: data }) => {
    try {
      const dataToJson = JSON.parse(data);
      const { error } = dataToJson || {}

      if (error && typeof error === 'object') {
        const {
          code,
          summary,
          detail
        } = error || {};
        const summaryParts = summary && summary.split('\n');
        
        return updateNpmAuditData({
          data: {
            error: true,
            content: [],
            summary: summaryParts && summaryParts[0],
            detail,
            code
          }
        });
      }

      return updateNpmAuditData({
        data: {
          error: false,
          content: dataToJson ? dataToJson.metadata : []
        }
      })
    } catch (error) {
      throw new Error(error)
    }
  }),
)

const npmRunAuditListenerEpic = pipe(
  ofType(npmAuditListener.type),
  switchMap(() => onNpmAudit$)
);

export { npmRunAuditEpic, npmRunAuditListenerEpic, npmAuditParseEpic, showAuditingLoaderEpic };
