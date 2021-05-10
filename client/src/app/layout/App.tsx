import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Test } from "../models/test";
import NavBar from "./NavBar";
import TestDashboard from "../../features/tests/dashboard/TestDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { testStore } = useStore();

  const [tests, setTests] = useState<Test[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    testStore.loadTests();
  }, [testStore]); // side-effect runs when any dependecy values changes

  function handleDeleteTest(id: string) {
    setSubmitting(true);
    agent.Tests.delete(id).then(() => {
      setTests([...tests.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (testStore.loadingIntial)
    return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <TestDashboard
          tests={testStore.tests}
          deleteTest={handleDeleteTest}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
