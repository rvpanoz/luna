import { combineEpics } from 'redux-observable';

import {
  npmRunInitEpic,
  npmRunLockEpic,
  npmRunInitListenerEpic,
  showInitLoaderEpic,
} from './initEpics';

import { npmRunDedupeEpic, npmRunDedupeListenerEpic } from './dedupeEpics';

import {
  npmRunCacheEpic,
  npmRunCacheListenerEpic,
  npmCacheParseEpic,
} from './cacheEpics';

export default combineEpics(
  npmRunLockEpic,
  npmRunInitEpic,
  npmRunInitListenerEpic,
  showInitLoaderEpic,
  npmRunDedupeEpic,
  npmRunDedupeListenerEpic,
  npmRunCacheEpic,
  npmRunCacheListenerEpic,
  npmCacheParseEpic
);
