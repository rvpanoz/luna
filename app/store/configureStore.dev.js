/**
 * Redux store
 */

/* eslint-disable no-unused-expressions */
/* eslint no-underscore-dangle: 0 */
/* eslint-disable global-require */

import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

// epics
import { epics as packagesEpic } from 'models/packages';

// reducers
import rootReducer from '../reducers';

const configureStore = initialState => {
  // create epic middleware
  const epicMiddleware = createEpicMiddleware();

  // redux Configuration
  const middleware = [epicMiddleware];
  const enhancers = [];

  // logging middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // skip redux logs in console during the tests
  if (process.env.NODE_ENV === 'development') {
    process.env.REDUX_LOGGER === 1 && middleware.push(logger);
  }

  // If redux DevTools Extension is installed use it,
  // otherwise use redux compose

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  // apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  epicMiddleware.run(packagesEpic);

  return store;
};

export default { configureStore };
