import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import example from "./example";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    // rest of your reducers
    example,
  });

export default createRootReducer;
