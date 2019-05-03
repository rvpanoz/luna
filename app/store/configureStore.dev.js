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
import { epics as npmEpics } from 'models/npm';
import { epics as commonEpics } from 'models/common';
import { epics as notificationsEpics } from 'models/notifications';

// root reducer
import rootReducer from '../reducers';

const reduxLogger = /--redux-logger/.test(process.argv[3]);

const configureStore = initialState => {
  const epicMiddleware = createEpicMiddleware();
  const middleware = [epicMiddleware];
  const enhancers = [];

  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  if (process.env.NODE_ENV === 'development') {
    if (reduxLogger) {
      middleware.push(logger);
    }
  }

  // if redux DevTools Extension is installed use it, otherwise use redux compose
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
  epicMiddleware.run(npmEpics);
  epicMiddleware.run(notificationsEpics);
  epicMiddleware.run(commonEpics);

  return store;
};

export default { configureStore };
