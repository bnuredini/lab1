import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import AllergyDetails from "../details/AllergyDetails";
import AllergyForm from "../form/AllergyForm";
import AllergyList from "./AllergyList";

export default observer(function AllergyDashboard() {
  const { allergyStore } = useStore();
  const { selectedAllergy, editMode } = allergyStore;

  useEffect(() => {
    allergyStore.loadAllergies();
  }, [allergyStore]);

  if (allergyStore.loadingIntial)
    return <LoadingComponent content="Loading app" />;

  document.title = "lab1";

  return (
    <>
      <Button
        onClick={() => allergyStore.openForm()}
        primary
        content="Krijo Alergjine"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
        <Grid.Column width="12">
          {selectedAllergy && !editMode && <AllergyDetails />}
          {editMode && <AllergyForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <AllergyList />
        </Grid.Column>
      </Grid>
    </>
  );
});
