import { createStore, applyMiddleware } from "redux";
import createRootReducer from "./reducers";
import reduxLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootSaga from "../redux/sagas/index";
export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  let middlewares = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(reduxLogger);
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const reducer = persistReducer(
    {
      key: "recipe-key",
      storage,
    },
    createRootReducer(history)
  );
  const store = createStore(reducer, preloadedState, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  return {
    persistor: persistStore(store),
    store,
  };
}
