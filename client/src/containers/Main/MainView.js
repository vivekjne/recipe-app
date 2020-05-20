import React from "react";
import { Link as RouterLink, Switch, Route, Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
// import Drawer from "@material-ui/core/Drawer";
import Drawer from "../../components/Drawer";
import Container from "@material-ui/core/Container";
import AppBar from "../../components/Appbar";

import { useStyles } from "../../themes/commonStyle";
import Example from "../Example";

function MainView() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer open={open} handleDrawerClose={handleDrawerClose} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          </Switch>
        </Container>
      </main>
    </div>
  );
}

export default MainView;
