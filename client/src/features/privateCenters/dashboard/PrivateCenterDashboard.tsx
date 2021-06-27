import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PrivateCenterDetails from "../details/PrivateCenterDetails";
import PrivateCenterForm from "../form/PrivateCenterForm";
import PrivateCenterList from "./PrivateCenterList";

export default observer(function PrivateCenterDashboard() {
  const { privateCenterStore } = useStore();
  const { selectedPrivateCenter, editMode } = privateCenterStore;

  useEffect(() => {
    privateCenterStore.loadPrivateCenters();
  }, [privateCenterStore]);

  if (privateCenterStore.loadingIntial)
    return <LoadingComponent content="Loading app" />;

    document.title = "lab1";

  return (
    <>
      <Button
        onClick={() => privateCenterStore.openForm()}
        primary
        content="Krijo qender"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
        <Grid.Column width="12">
          {selectedPrivateCenter && !editMode && <PrivateCenterDetails />}
          {editMode && <PrivateCenterForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <PrivateCenterList />
        </Grid.Column>
      </Grid>
    </>
  );
});
