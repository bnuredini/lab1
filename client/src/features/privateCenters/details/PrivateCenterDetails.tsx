import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function PrivateCenterDetails() {
  const { privateCenterStore } = useStore();
  const { selectedPrivateCenter: privateCenter, openForm, cancelSelectedPrivateCenter }
   =  privateCenterStore;

  if (!privateCenter) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{ privateCenter.name}</Card.Header>
        <Card.Description>{ privateCenter.location}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm( privateCenter.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedPrivateCenter}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
