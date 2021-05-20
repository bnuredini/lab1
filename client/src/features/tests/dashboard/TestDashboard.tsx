import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import TestDetails from "../details/TestDetails";
import TestForm from "../form/TestForm";
import TestList from "./TestList";

export default observer(function TestDashboard() {
  const { testStore } = useStore();
  const { selectedTest, editMode } = testStore;

  useEffect(() => {
    testStore.loadTests();
  }, [testStore]); // side-effect runs when any dependecy values changes

  if (testStore.loadingIntial)
    return <LoadingComponent content="Loading app" />;

  // set the app's title
  // TODO: find a better way to do this
  document.title = "lab1";

  return (
    <>
      <Button
        onClick={() => testStore.openForm()}
        primary
        content="Krijo test"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
        <Grid.Column width="12">
          {selectedTest && !editMode && <TestDetails />}
          {editMode && <TestForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <TestList />
        </Grid.Column>
      </Grid>
    </>
  );
});
