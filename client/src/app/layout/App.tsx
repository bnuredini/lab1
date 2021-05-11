import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import TestDashboard from "../../features/tests/dashboard/TestDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { testStore } = useStore();

  useEffect(() => {
    testStore.loadTests();
  }, [testStore]); // side-effect runs when any dependecy values changes

  if (testStore.loadingIntial)
    return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <TestDashboard />
      </Container>
    </>
  );
}

export default observer(App);
