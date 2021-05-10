import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Test } from "../../../app/models/test";
import { useStore } from "../../../app/stores/store";

interface Props {
  tests: Test[];
  deleteTest: (id: string) => void;
  submitting: boolean;
}

export default function TestList({ tests, deleteTest, submitting }: Props) {
  const [target, setTarget] = useState("");

  function handleTestDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteTest(id);
  }

  const { testStore } = useStore();

  return (
    <Segment>
      <Item.Group divided>
        {tests.map((test) => (
          <Item key={test.id}>
            <Item.Content>
              <Item.Header as="a">{test.description}</Item.Header>
              <Item.Meta>{test.date}</Item.Meta>
              <Item.Description>
                <div>{test.description}</div>
                <div>
                  {test.hospitalId}, {test.vaccineId}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => testStore.selectTest(test.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={test.id}
                  loading={submitting && target === test.id}
                  onClick={(e) => handleTestDelete(e, test.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={test.variation} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
