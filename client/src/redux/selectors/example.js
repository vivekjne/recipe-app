import { createSelector } from "reselect";

const exampleSelector = (state) => state.example;

const getLoading = createSelector(
  [exampleSelector],
  (exampleState) => exampleState.loading
);

const getData = createSelector(
  [exampleSelector],
  (exampleState) => exampleState.data
);

const getError = createSelector(
  [exampleSelector],
  (exampleState) => exampleState.error
);

export { getLoading, getData, getError };
