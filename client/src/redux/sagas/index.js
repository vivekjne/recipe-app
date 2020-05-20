import { all, fork } from "redux-saga/effects";

import example from "./example";

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(example)]);
}
