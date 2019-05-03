/* eslint-disable import/prefer-default-export */

/**
 * RX custom operators
 * */

import { map, withLatestFrom, filter } from 'rxjs/operators';

const onOffOperator = (on, off) => src$ => {
  const isPaused = data => [on, off].includes(data);

  return src$.pipe(
    withLatestFrom(src$.pipe(filter(isPaused))),
    filter(([value, paused]) => paused === on), // eslint-disable-line
    map(([value]) => value),
    filter(data => !isPaused(data))
  );
};

export { onOffOperator };
