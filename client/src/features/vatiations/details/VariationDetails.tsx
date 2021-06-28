import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function VariationDetails() {
  const { variationStore } = useStore();
  const { selectedVariation: variation, openForm, cancelSelectedVariation }
   =  variationStore;

  if (!variation) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{ variation.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm( variation.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedVariation}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
