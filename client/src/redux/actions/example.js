import {
  FETCH_POSTS,
  FETCH_POSTS_LOADING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from "../actionTypes/example";

export const fetchPosts = () => ({
  type: FETCH_POSTS,
});

export const fetchPostsLoading = (flag) => ({
  type: FETCH_POSTS_LOADING,
  payload: flag,
});

export const fetchPostsSuccess = (data) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: data,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});
