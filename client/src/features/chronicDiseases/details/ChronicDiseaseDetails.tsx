import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ChronicDiseaseDetails() {
  const { chronicDiseaseStore } = useStore();
  const { selectedChronicDisease: chronicDisease, openForm, cancelSelectedChronicDisease }
   =  chronicDiseaseStore;

  if (!chronicDisease) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{ chronicDisease.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm( chronicDisease.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedChronicDisease}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
