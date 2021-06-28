import { format } from "date-fns";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

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
      {/* <Image src={`/assets/categoryImages/${vaccine.variation}.jpg`} /> */}
      <Card.Content>
        <Card.Header>{vaccine.name}</Card.Header>
        {/* <Card.Meta>
          <span>{format(test.date!, "dd.MM.yyyy, (h:mm aa)")}</span>
        </Card.Meta> */}
        <Card.Description>{vaccine.name}</Card.Description>
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
