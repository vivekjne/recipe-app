import { produce } from "immer";
import {
  FETCH_POSTS_LOADING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS,
} from "../actionTypes/example";

const initialState = {
  loading: true,
  error: null,
  data: [],
};

const exampleReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_POSTS:
        draft.loading = true;
        draft.error = null;
        draft.data = [];
        break;
      case FETCH_POSTS_LOADING:
        draft.loading = action.flag;
        break;
      case FETCH_POSTS_SUCCESS:
        draft.data = action.payload;
        break;

      case FETCH_POSTS_FAILURE:
        draft.error = null;
        break;
    }
  });

export default exampleReducer;
