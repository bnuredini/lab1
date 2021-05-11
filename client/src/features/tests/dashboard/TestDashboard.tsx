import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TestDetails from "../details/TestDetails";
import TestForm from "../form/TestForm";
import TestList from "./TestList";

export default observer(function TestDashboard() {
  const { testStore } = useStore();
  const { selectedTest, editMode } = testStore;

  // set the app's title
  // TODO: find a better way to do this
  document.title = "lab1";

  return (
    <Grid>
      <Grid.Column width="10">
        <TestList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedTest && !editMode && <TestDetails />}
        {editMode && <TestForm />}
      </Grid.Column>
    </Grid>
  );
});
