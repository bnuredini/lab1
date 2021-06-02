import React, { useEffect } from "react";
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
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import LoginPage from "../../features/users/LoginPage";
import ModalContainer from "../common/modals/ModalContainer";
import Stats from "../../Stats";
import ScreeningTest from "../../features/screening-test/ScreeningTest";

function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <NavBar />
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar />

      <Container style={{ marginTop: "7em" }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/screening-test" component={ScreeningTest} />
          <Route exact path="/stats" component={Stats} />
          <Route path="/tests" component={TestDashboard} />
          <Route path="/countries" component={CountryDashboard} />
          <Route path="/patients" component={PatientDashboard} />
          <Route path="/newPatient" component={PatientForm} />
          <Route path="/errors" component={TestErrors} />
          <Route path="/server-error" component={ServerError} />
          <Route path="/login" component={LoginForm} />
          <Route exact path="/loginpage" component={LoginPage} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </>
  );
}

export default observer(App);
