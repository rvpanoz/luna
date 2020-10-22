import { pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { setSnackbar } from 'models/ui/actions';
import { updateStatus } from 'models/common/actions';

const onlineStatusEpic = pipe(
  ofType(updateStatus.type),
  filter(({ payload: { status } }) => status === 'offline'),
  map(({ payload: { status } }) => ({
    type: setSnackbar.type,
    payload: {
      open: true,
      type: 'error',
      message: `App is now ${status}`,
    },
  }))
);

export default combineEpics(onlineStatusEpic);
