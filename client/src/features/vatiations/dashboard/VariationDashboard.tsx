import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import VariationDetails from "../details/VariationDetails";
import VariationForm from "../form/VariationForm";
import VariationList from "./VariationList";

export default observer(function VariationDashboard() {
  const { variationStore } = useStore();
  const { selectedVariation, editMode } = variationStore;

  useEffect(() => {
    variationStore.loadVariations();
  }, [variationStore]);

  if (variationStore.loadingIntial)
    return <LoadingComponent content="Loading app" />;

    document.title = "lab1";

  return (
    <>
      <Button
        onClick={() => variationStore.openForm()}
        primary
        content="Krijo variacion"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
        <Grid.Column width="12">
          {selectedVariation && !editMode && <VariationDetails />}
          {editMode && <VariationForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <VariationList />
        </Grid.Column>
      </Grid>
    </>
  );
});
