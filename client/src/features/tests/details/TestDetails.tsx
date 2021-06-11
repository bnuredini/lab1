import { format } from "date-fns";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
// import { Link } from "react-router-dom";

export default function TestDetails() {
  const { testStore } = useStore();
  const { selectedTest: test, openForm, cancelSelectedTest } = testStore;

  if (!test) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${test.variation}.jpg`} />
      <Card.Content>
        <Card.Header>{test.description}</Card.Header>
        <Card.Meta>
          <span>{format(test.date!, "dd.MM.yyyy, (h:mm aa)")}</span>
        </Card.Meta>
        <Card.Description>{test.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(test.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedTest}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
