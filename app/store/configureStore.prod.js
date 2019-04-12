/**
 * Redux store
 */

/* eslint no-underscore-dangle: 0 */
/* eslint-disable global-require */

import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

// epics
import { epics as packagesEpics } from 'models/packages';
// import { epics as uiEpics } from 'models/ui';
import { epics as npmEpics } from 'models/npm';
import { epics as notificationsEpics } from 'models/notifications';

// reducers
import rootReducer from '../reducers';

const configureStore = initialState => {
  // create epic middleware
  const epicMiddleware = createEpicMiddleware();

  // redux Configuration
  const middleware = [epicMiddleware];
  const enhancers = [];

  // apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = compose(...enhancers);

  // create Store
  const store = createStore(rootReducer, initialState, enhancer);

  epicMiddleware.run(uiEpics);
  epicMiddleware.run(packagesEpics);
  epicMiddleware.run(npmEpics);
  epicMiddleware.run(notificationsEpics);

  return store;
};

export default { configureStore };
