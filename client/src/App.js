import React from "react";
import { Switch, Route } from "react-router-dom";
// import { useStyles } from "./themes/commonStyle";
import Main from "./containers/Main";
import Example from "./containers/Example";

function App() {
  // const classes = useStyles();

  return (
    <Switch>
      <Route path="/example" component={Example} />

      <Route path="/" component={Main} />
    </Switch>
  );
}

export default App;
