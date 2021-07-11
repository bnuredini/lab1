import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import TreatmentList from "./TreatmentList";
import TreatmentDetails from "../details/TreatmentDetails";
import TreatmentForm from "../form/TreatmentForm";

export default observer(function TreatmentDashboard() {
  const { treatmentStore } = useStore();
  const { editMode, selectedTreatment } = treatmentStore;

  useEffect(() => {
    treatmentStore.loadTreatments();
  }, [treatmentStore]); 

  if (treatmentStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

 
  return (
    <>
<Button
        onClick={() => treatmentStore.openForm()}
        primary
        content="Krijo trajtim"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
<Grid.Column width="12">
          {selectedTreatment && !editMode && <TreatmentDetails/>}
          {editMode && <TreatmentForm/>}
        </Grid.Column>
        <Grid.Column width="12">
          <TreatmentList />
        </Grid.Column>
      </Grid>
    </>
  );
});
