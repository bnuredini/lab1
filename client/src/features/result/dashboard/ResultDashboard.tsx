import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ResultDetails from "../details/ResultDetails";
import ResultForm from "../form/ResultForm";
import ResultList from "./ResultList";

export default observer(function ResultDashboard() {
  const { resultStore } = useStore();
  const { selectedResult, editMode } = resultStore;

  useEffect(() => {
    resultStore.loadResults();
  }, [resultStore]);

  if (resultStore.loadingIntial)
    return <LoadingComponent content="Loading Results" />;

  document.title = "lab1";

  return (
    <>
      <Button
        onClick={() => resultStore.openForm()}
        primary
        content="Vendos Rezultatet"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
        <Grid.Column width="12">
          {selectedResult && !editMode && <ResultDetails />}
          {editMode && <ResultForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <ResultList />
        </Grid.Column>
      </Grid>
    </>
  );
});
