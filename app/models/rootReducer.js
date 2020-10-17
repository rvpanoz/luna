import { combineReducers } from 'redux';
import common from './common/reducer';
import packages from './packages/reducer';
import npm from './npm/reducer';
import ui from './ui/reducer';
import notifications from './notifications/reducer';

const rootReducer = combineReducers({
  common,
  packages,
  ui,
  notifications,
  npm,
});

export default rootReducer;
