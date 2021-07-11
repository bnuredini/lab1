import { format } from "date-fns";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import drugStore from "../../../app/stores/drugStore";
import { useStore } from "../../../app/stores/store";

export default function DrugDetails() {
  const { drugStore } = useStore();
  const {
    selectedDrug: drug,
    openForm,
    cancelSelectedDrug,
  } = drugStore;
  if (!drug) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{drug.name}</Card.Header>
        <Card.Description>{drug.name}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(drug.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedDrug}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
