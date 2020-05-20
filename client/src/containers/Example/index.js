import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../redux/actions/example";
import { createStructuredSelector } from "reselect";
import { getData, getError, getLoading } from "../../redux/selectors/example";
import ExampleView from "./ExampleView";

const Example = ({ getPosts, posts, error, loading }) => {
  useEffect(() => {
    getPosts();
  }, []);
  return <ExampleView data={posts} error={error} loading={loading} />;
};

const mapStateToProps = createStructuredSelector({
  loading: getLoading,
  posts: getData,
  error: getError,
});

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(fetchPosts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);
