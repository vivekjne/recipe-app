import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../redux/actions/example";
import { createStructuredSelector } from "reselect";
import { getData, getError, getLoading } from "../../redux/selectors/example";
import MainView from "./MainView";

const Main = () => {
  return <MainView />;
};

export default Main;
