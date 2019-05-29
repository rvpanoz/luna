import { combineEpics } from 'redux-observable';

import {
  npmRunAuditEpic,
  npmRunAuditListenerEpic,
  showAuditingLoaderEpic
} from './auditEpics';

export default combineEpics(
  npmRunAuditEpic,
  npmRunAuditListenerEpic,
  showAuditingLoaderEpic
);
