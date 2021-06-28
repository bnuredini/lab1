import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ChronicDiseaseDetails from "../details/ChronicDiseaseDetails";
import ChronicDiseaseForm from "../form/ChronicDiseaseForm";
import ChronicDiseaseList from "./ChronicDiseaseList";

export default observer(function ChronicDiseaseDashboard() {
  const { chronicDiseaseStore } = useStore();
  const { selectedChronicDisease, editMode } = chronicDiseaseStore;

  useEffect(() => {
    chronicDiseaseStore.loadChronicDiseases();
  }, [chronicDiseaseStore]);

  if (chronicDiseaseStore.loadingIntial)
    return <LoadingComponent content="Loading app" />;

    document.title = "lab1";

  return (
    <>
      <Button
        onClick={() => chronicDiseaseStore.openForm()}
        primary
        content="Krijo semundjen kronike"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
        <Grid.Column width="12">
          {selectedChronicDisease && !editMode && <ChronicDiseaseDetails />}
          {editMode && <ChronicDiseaseForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <ChronicDiseaseList />
        </Grid.Column>
      </Grid>
    </>
  );
});
