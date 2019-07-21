import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { setSnackbar } from 'models/ui/actions';
import { updateStatus } from 'models/common/actions';

const onlineStatusEpic = pipe(
  ofType(updateStatus.type),
  map(({ payload: { status } }) => ({
    type: setSnackbar.type,
    payload: {
      type: status === 'online' ? 'success' : 'error',
      open: true,
      message: `App is now ${status}`
    }
  }))
);

export default combineEpics(onlineStatusEpic);
