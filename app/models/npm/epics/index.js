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
  npmRunDoctorEpic,
  npmRunDoctorListenerEpic,
  showDoctorLoaderEpic
);
