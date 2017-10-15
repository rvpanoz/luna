import {createStore} from "redux";
import reducer from "./reducers";

const configureStore = (initialState) => {
  return createStore(reducer, initialState);
}

export default configureStore;
