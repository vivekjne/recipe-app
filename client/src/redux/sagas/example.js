import { all, call, put, takeLatest } from "redux-saga/effects";
import { FETCH_POSTS } from "../actionTypes/example";
import {
  fetchPostsLoading,
  fetchPostsSuccess,
  fetchPostsFailure,
} from "../actions/example";
import exampleClient from "../../api/exampleClient";

export function* getData(action) {
  try {
    const response = yield call(exampleClient.fetchPosts);
    console.log("posts response=", response);
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsFailure({ status: false, error: error.message }));
  }
  yield put(fetchPostsLoading(false));
}

export default function* root() {
  yield all([takeLatest(FETCH_POSTS, getData)]);
}
