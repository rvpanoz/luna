/**
 * Redux store
 */

/* eslint no-underscore-dangle: 0 */
/* eslint-disable global-require */

import { createStore } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const configureStore = initialState => {
  // redux Configuration
  const middleware = [];

  // logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // skip redux logs in console during the tests
  if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
  }

  // create Store
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
};

export default { configureStore };
