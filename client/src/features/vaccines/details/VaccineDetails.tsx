import { format } from "date-fns";
import React from "react";
import { Button, Card, Image, List } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import VaccineListItemPatient from "./VaccineListItemPatient";

export default function VaccineDetails() {
  const { vaccineStore } = useStore();
  const {
    selectedVaccine: vaccine,
    openForm,
    cancelSelectedVaccine,
  } = vaccineStore;

  if (!vaccine) return <LoadingComponent />;

  return (
    <Card fluid>
      <VaccineListItemPatient patients={vaccine.patients!} />
      <Card.Content>
        <Card.Header>{vaccine.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(vaccine.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedVaccine}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
