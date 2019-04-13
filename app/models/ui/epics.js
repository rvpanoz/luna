import { map } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { setSnackbar } from 'models/ui/actions';
import { updateStatus } from 'models/common/actions';

const onlineStatusEpic = action$ =>
  action$.pipe(
    ofType(updateStatus.type),
    map(({ payload: { status } }) => ({
      type: setSnackbar.type,
      payload: {
        type: 'info',
        open: true,
        message: `App is now ${status}`
      }
    }))
  );

export default combineEpics(onlineStatusEpic);
