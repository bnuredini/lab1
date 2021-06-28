import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PublicCenterDetails from "../details/PublicCenterDetails";
import PublicCenterForm from "../form/PublicCenterForm";
import PublicCenterList from "./PublicCenterList";

export default observer(function PublicCenterDashboard() {
  const { publicCenterStore } = useStore();
  const { selectedPublicCenter, editMode } = publicCenterStore;

  useEffect(() => {
    publicCenterStore.loadPublicCenters();
  }, [publicCenterStore]);

  if (publicCenterStore.loadingIntial)
    return <LoadingComponent content="Loading app" />;

    document.title = "lab1";

  return (
    <>
      <Button
        onClick={() => publicCenterStore.openForm()}
        primary
        content="Krijo qender"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
        <Grid.Column width="12">
          {selectedPublicCenter && !editMode && <PublicCenterDetails />}
          {editMode && <PublicCenterForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <PublicCenterList />
        </Grid.Column>
      </Grid>
    </>
  );
});
