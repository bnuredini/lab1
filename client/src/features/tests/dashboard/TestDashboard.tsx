import React from "react";
import { Grid } from "semantic-ui-react";
import { Test } from "../../../app/models/test";
import TestDetails from "../details/TestDetails";
import TestForm from "../form/TestForm";
import TestList from "./TestList";

interface Props {
  tests: Test[];
  selectedTest: Test | undefined;
  selectTest: (id: string) => void;
  cancelSelectTest: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (test: Test) => void;
  deleteTest: (id: string) => void;
  submitting: boolean;
}

export default function TestDashboard({
  tests,
  selectedTest,
  deleteTest,
  selectTest,
  cancelSelectTest,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <TestList
          tests={tests}
          selectTest={selectTest}
          deleteTest={deleteTest}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedTest && !editMode && (
          <TestDetails
            test={selectedTest}
            cancelSelectTest={cancelSelectTest}
            openForm={openForm}
          />
        )}
        {editMode && (
          <TestForm
            closeForm={closeForm}
            test={selectedTest}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
