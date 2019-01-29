/**
 * Redux store
 */

/* eslint no-underscore-dangle: 0 */
/* eslint-disable global-require */

import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

// epics
import { epics as packagesEpics } from 'models/packages';
import { epics as uiEpics } from 'models/ui';

// reducers
import rootReducer from '../reducers';

const configureStore = initialState => {
  const epicMiddleware = createEpicMiddleware();
  const middleware = [epicMiddleware];
  const enhancers = [];

  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
  }

  // If redux DevTools Extension is installed use it, otherwise use redux compose

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

  // apply middleware & compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // store creation
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  epicMiddleware.run(uiEpics);
  epicMiddleware.run(packagesEpics);

  return store;
};

export default { configureStore };
