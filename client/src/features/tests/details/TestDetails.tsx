import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Test } from "../../../app/models/test";

interface Props {
  test: Test;
  cancelSelectTest: () => void;
  openForm: (id: string) => void;
}

export default function TestDetails({
  test,
  cancelSelectTest,
  openForm,
}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${test.variation}.jpg`} />
      <Card.Content>
        <Card.Header>{test.description}</Card.Header>
        <Card.Meta>
          <span>{test.date}</span>
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
            onClick={cancelSelectTest}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
