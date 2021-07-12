import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import RoleDetails from "../details/RoleDetails";
import RoleForm from "../form/RoleForm";
import RoleList from "./RoleList";

export default observer(function RoleDashboard() {
  const { roleStore } = useStore();
  const { selectedRole, editMode } = roleStore;

  useEffect(() => {
    roleStore.loadRoles();
  }, [roleStore]);

  if (roleStore.loadingIntial)
    return <LoadingComponent content="Loading app" />;

  document.title = "lab1";

  return (
    <>
      <Button
        onClick={() => roleStore.openForm()}
        primary
        content="Krijo Rolin"
        style={{ marginBottom: "1.4rem" }}
      />
      <Grid>
        <Grid.Column width="12">
          {selectedRole && !editMode && <RoleDetails />}
          {editMode && <RoleForm />}
        </Grid.Column>
        <Grid.Column width="12">
          <RoleList />
        </Grid.Column>
      </Grid>
    </>
  );
});
