import { map, withLatestFrom, filter } from 'rxjs/operators';

const onOffOperator = (on, off) => src$ => {
  const isPaused = data => [on, off].includes(data);

  return src$.pipe(
    tap(data => console.log('data', data)),
    withLatestFrom(
      src$.pipe(
        tap(data => console.log('inWTL', data)),
        filter(isPaused),
        tap(data => console.log(3, data)) // ???
      )
    ),
    tap(data => console.log('wtl', data)),
    filter(([value, paused]) => paused === on), // eslint-disable-line
    map(([value]) => value),
    tap(data => console.log(1, data)),
    filter(data => !isPaused(data)),
    tap(data => console.log(2, data))
  );
};

export default onOffOperator;
