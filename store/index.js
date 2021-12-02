import { createStore, combineReducers, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import navigation from "./reducers/navigation";
import errors from "./reducers/errors";

const createReducer = () =>
  combineReducers({
    navigation,
    errors,
  });

const makeStore = () => {
  // const store = createStore(createReducer(), applyMiddleware(thunkMiddleware))
  const store = {
    getState: () => {
      return { dispatch: () => {} };
    },
    subscribe: () => {},
  };
  if (typeof window !== "undefined") {
    window.getState = store.getState;
  }
  return store;
};

export default createWrapper(makeStore);
