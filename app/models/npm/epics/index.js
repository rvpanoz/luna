import { combineEpics } from 'redux-observable';

import {
  npmRunAuditEpic,
  npmRunAuditListenerEpic,
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
  npmRunDoctorEpic,
  npmRunDoctorListenerEpic,
  showDoctorLoaderEpic
);
