import { combineEpics } from 'redux-observable';

import {
  npmRunAuditEpic,
  npmRunAuditListenerEpic,
  npmAuditParseEpic,
  showAuditingLoaderEpic
} from './auditEpics';

import {
  npmRunDoctorEpic,
  npmRunDoctorListenerEpic,
  showDoctorLoaderEpic
} from './doctorEpics';

export default combineEpics(
  npmRunAuditEpic,
  npmRunAuditListenerEpic,
  showAuditingLoaderEpic,
  npmAuditParseEpic,
  npmRunDoctorEpic,
  npmRunDoctorListenerEpic,
  showDoctorLoaderEpic
);
