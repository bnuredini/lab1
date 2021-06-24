import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import VaccineDetails from "../details/VaccineDetails";
import VaccineForm from "../form/VaccineForm";
import VaccineList from "./VaccineList";

export default observer(function VaccineDashboard() {
  const { vaccineStore } = useStore();
  const { selectedVaccine, editMode } = vaccineStore;

  useEffect(() => {
    vaccineStore.loadVaccines();
  }, [vaccineStore]); // side-effect runs when any dependecy values changes

  if (vaccineStore.loadingIntial)
    return <LoadingComponent content="Loading app" />;

  // set the app's title
  // TODO: find a better way to do this
  document.title = "lab1";

  return (
    <>
      <Button
        onClick={() => vaccineStore.openForm()}
        primary
        content="Krijo Vaksine"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
        <Grid.Column width="12">
          {selectedVaccine && !editMode && <VaccineDetails />}
          {editMode && <VaccineForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <VaccineList />
        </Grid.Column>
      </Grid>
    </>
  );
});
