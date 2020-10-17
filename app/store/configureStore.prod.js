/**
 * Redux store
 */

import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { epics as packagesEpics } from 'models/packages';
import { epics as uiEpics } from 'models/ui';
import { epics as npmEpics } from 'models/npm';
import { epics as commonEpics } from 'models/common';
import { epics as notificationsEpics } from 'models/notifications';
import rootReducer from 'models/rootReducer';

const configureStore = (initialState) => {
  // create epic middleware
  const epicMiddleware = createEpicMiddleware();

  // redux configuration
  const middleware = [epicMiddleware];
  const enhancers = [];

  // apply middleware & compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = compose(...enhancers);

  // create Store
  const store = createStore(rootReducer, initialState, enhancer);

  epicMiddleware.run(uiEpics);
  epicMiddleware.run(packagesEpics);
  epicMiddleware.run(npmEpics);
  epicMiddleware.run(notificationsEpics);
  epicMiddleware.run(commonEpics);

  return store;
};

export default { configureStore };
