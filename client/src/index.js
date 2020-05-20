import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore, { history } from "./redux/configureStore";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ConnectedRouter } from "connected-react-router";
export const { store, persistor } = configureStore({});

global.store = store;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <React.StrictMode>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
