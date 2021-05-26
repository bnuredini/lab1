import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PatientList from "./PatientList";
import PatientDetails from "../details/PatientDetails";
import PatientForm from "../form/PatientForm";

export default observer(function PatientDashboard() {
  const { patientStore } = useStore();
  const { editMode, selectedPatient } = patientStore;

  useEffect(() => {
    patientStore.loadPatients();
  }, [patientStore]); 

  if (patientStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

 
  return (
    <>
<Button
        onClick={() => patientStore.openForm()}
        primary
        content="Regjistohu"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
<Grid.Column width="12">
          {selectedPatient && !editMode && <PatientDetails />}
          {editMode && <PatientForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <PatientList />
        </Grid.Column>
      </Grid>
    </>
  );
});
