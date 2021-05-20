import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PatientList from "./PatientList";

export default observer(function PatientDashboard() {
  const { patientStore } = useStore();
  const { loadPatients, patientRegistry } = patientStore;
  useEffect(() => {
    if (patientRegistry.size <= 1) loadPatients();
  }, [patientRegistry.size, loadPatients]);

  if (patientStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;
  return (
    <>
      <Button
        primary
        content="Krijo pacient"
        to="/whatthe"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
        <Grid.Column width="10">
          <PatientList />
        </Grid.Column>
        <Grid.Column width="6"></Grid.Column>
      </Grid>
    </>
  );
});
