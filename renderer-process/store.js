import {createStore} from 'redux';
import appReducer from './reducers';

const configureStore = (initialState) => {
  return createStore(appReducer, initialState);
}

export default configureStore;
