import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { Test } from "../../../app/models/test";
import { useStore } from "../../../app/stores/store";
import TestDetails from "../details/TestDetails";
import TestForm from "../form/TestForm";
import TestList from "./TestList";

interface Props {
  tests: Test[];
  deleteTest: (id: string) => void;
  submitting: boolean;
}

export default observer(function TestDashboard({
  tests,
  deleteTest,
  submitting,
}: Props) {
  const { testStore } = useStore();
  const { selectedTest, editMode } = testStore;

  interface IProps {
    name: string;
  }

  // set the app's title
  // TODO: find a better way to do this
  document.title = "lab1";

  return (
    <Grid>
      <Grid.Column width="10">
        <TestList
          tests={tests}
          deleteTest={deleteTest}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedTest && !editMode && <TestDetails />}
        {editMode && <TestForm />}
      </Grid.Column>
    </Grid>
  );
});
