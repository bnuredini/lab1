import { format } from "date-fns";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import treatmentStore from "../../../app/stores/treatmentStore";
import { useStore } from "../../../app/stores/store";

export default function TreatmentDetails() {
  const { treatmentStore } = useStore();
  const {
    selectedTreatment: treatment,
    openForm,
    cancelSelectedTreatment,
  } = treatmentStore;
  if (!treatment) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{treatment.description}</Card.Header>
        <Card.Description>{treatment.date}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(treatment.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedTreatment}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
