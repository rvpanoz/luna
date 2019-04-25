/**
 * RX operators
 * */

import { map, withLatestFrom, filter, tap } from 'rxjs/operators';

const onOffOperator = (on, off) => src$ => {
  const isPaused = data => [on, off].includes(data);

  return src$.pipe(
    withLatestFrom(
      src$.pipe(
        filter(payload => {
          console.log(isPaused(payload));
          return isPaused(payload);
        })
      )
    ),
    tap(console.log),
    filter(([value, paused]) => paused === on), // eslint-disable-line
    map(([value]) => value),
    // tap(console.log),
    filter(data => !isPaused(data))
  );
};
export { onOffOperator };
