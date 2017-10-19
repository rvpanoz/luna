import {createStore} from "redux";
import reducer from "./reducers";

const configureStore = (initialState) => {
  return createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default configureStore;
