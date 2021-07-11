import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import DrugList from "./DrugList";
import DrugDetails from "../details/DrugDetails";
import DrugForm from "../form/DrugForm";

export default observer(function DrugDashboard() {
  const { drugStore } = useStore();
  const { editMode, selectedDrug } = drugStore;

  useEffect(() => {
    drugStore.loadDrugs();
  }, [drugStore]); 

  if (drugStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

 
  return (
    <>
<Button
        onClick={() => drugStore.openForm()}
        primary
        content="Add"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
<Grid.Column width="12">
          {selectedDrug && !editMode && <DrugDetails />}
          {editMode && <DrugForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <DrugList />
        </Grid.Column>
      </Grid>
    </>
  );
});
