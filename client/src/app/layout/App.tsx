import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Test } from "../models/test";
import NavBar from "./NavBar";
import TestDashboard from "../../features/tests/dashboard/TestDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Tests.list().then((response) => {
      let tests: Test[] = [];
      response.forEach((test) => {
        test.date = test.date.split("T")[0];
        tests.push(test);
      });
      setTests(tests);
      setLoading(false);
    });
  }, []);

  function handleSelectTest(id: string) {
    setSelectedTest(tests.find((x) => x.id === id));
  }

  function handleCancelSelectTest() {
    setSelectedTest(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectTest(id) : handleCancelSelectTest();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditTest(test: Test) {
    setSubmitting(true);
    if (test.id) {
      agent.Tests.update(test).then(() => {
        setTests([...tests.filter((x) => x.id !== test.id), test]);
        setSelectedTest(test);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      test.id = uuid();
      agent.Tests.create(test).then(() => {
        setTests([...tests, test]);
        setSelectedTest(test);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteTest(id: string) {
    setSubmitting(true);
    agent.Tests.delete(id).then(() => {
      setTests([...tests.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <TestDashboard
          tests={tests}
          selectedTest={selectedTest}
          selectTest={handleSelectTest}
          cancelSelectTest={handleCancelSelectTest}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditTest}
          deleteTest={handleDeleteTest}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
