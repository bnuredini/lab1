import { format } from "date-fns";
import React from "react";
import { Button, Card, Image, List } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import RoleListItemPatient from "./RoleListItemUser";
import RoleListItemUser from "./RoleListItemUser";

export default function RoleDetails() {
  const { roleStore } = useStore();
  const {
    selectedRole: role,
    openForm,
    cancelSelectedRole,
  } = roleStore;

  if (!role) return <LoadingComponent />;

  return (
    <Card fluid>
      <RoleListItemUser users={role.users!} />
      <Card.Content>
        <Card.Header>{role.roleName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(role.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedRole}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
