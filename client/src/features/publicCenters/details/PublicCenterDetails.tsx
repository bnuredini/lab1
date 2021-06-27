import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function PublicCenterDetails() {
  const { publicCenterStore } = useStore();
  const { selectedPublicCenter: publicCenter, openForm, cancelSelectedPublicCenter }
   =  publicCenterStore;

  if (!publicCenter) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{ publicCenter.name}</Card.Header>
        <Card.Description>{ publicCenter.location}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm( publicCenter.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedPublicCenter}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
