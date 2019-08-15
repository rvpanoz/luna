import { combineEpics } from 'redux-observable';

import {
  npmRunInitEpic,
  npmRunLockEpic,
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
  showDoctorLoaderEpic,
  npmDoctorParseEpic
} from './doctorEpics';

import {
  npmRunDedupeEpic,
  npmRunDedupeListenerEpic,
} from './dedupeEpics';

export default combineEpics(
  npmRunLockEpic,
  npmRunInitEpic,
  npmRunInitListenerEpic,
  showInitLoaderEpic,
  npmRunAuditEpic,
  npmRunAuditListenerEpic,
  showAuditingLoaderEpic,
  npmAuditParseEpic,
  npmAuditParseFixEpic,
  npmDoctorParseEpic,
  npmRunDoctorEpic,
  npmRunDoctorListenerEpic,
  showDoctorLoaderEpic,
  npmRunDedupeEpic,
  npmRunDedupeListenerEpic,
);
