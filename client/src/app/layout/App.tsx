import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import TestDashboard from "../../features/tests/dashboard/TestDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import CountryDashboard from "../../features/stats/CountryDashboard";
import PatientDashboard from "../../features/patients/dashboard/PatientDashboard";
import PatientForm from "../../features/patients/form/PatientForm";
import TestErrors from "../../errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../errors/NotFound";
import ServerError from "../../errors/ServerError";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ToastContainer position="bottom-right" hideProgressBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/tests" component={TestDashboard} />
          <Route path="/countries" component={CountryDashboard} />
          <Route path="/patients" component={PatientDashboard} />
          <Route path="/newPatient" component={PatientForm} />
          <Route path="/errors" component={TestErrors} />
          <Route path="/server-error" component={ServerError} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </>
  );
}

export default observer(App);
