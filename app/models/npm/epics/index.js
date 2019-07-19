import { combineEpics } from 'redux-observable';

import {
  npmRunInitEpic,
  npmRunInitListenerEpic,
  showInitLoaderEpic
} from './initEpics';

import {
  npmRunAuditEpic,
  npmRunAuditListenerEpic,
  npmAuditParseEpic,
  npmAuditParseFixEpic,
  showAuditingLoaderEpic
} from './auditEpics';

import {
  npmRunDoctorEpic,
  npmRunDoctorListenerEpic,
  showDoctorLoaderEpic
} from './doctorEpics';

export default combineEpics(
  npmRunInitEpic,
  npmRunInitListenerEpic,
  showInitLoaderEpic,
  npmRunAuditEpic,
  npmRunAuditListenerEpic,
  showAuditingLoaderEpic,
  npmAuditParseEpic,
  npmAuditParseFixEpic,
  npmRunDoctorEpic,
  npmRunDoctorListenerEpic,
  showDoctorLoaderEpic
);
