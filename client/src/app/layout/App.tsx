import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import TestDashboard from "../../features/tests/dashboard/TestDashboard";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import CountryDashboard from "../../features/stats/CountryDashboard";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route path="/tests" component={TestDashboard} />
        <Route path="/countries" component={CountryDashboard} />
      </Container>
    </>
  );
}

export default observer(App);
