
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ResultList() {
  const { resultStore } = useStore();
  const { deleteResult, results, loading } = resultStore;
  const [target, setTarget] = useState("");

  function handleResultDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteResult(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {results.map((result) => {
          return (
            <Item key={result.id}>
              <Item.Content>
                <Item.Header as="a">{result.result}</Item.Header>
                <Item.Description>
                  <div>{result.testName}</div>
                  <div>
                    {result.date}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => resultStore.selectResult(result.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={result.id}
                    loading={loading && target === result.id}
                    onClick={(e) => handleResultDelete(e, result.id)}
                    floated="right"
                    content="Fshij"
                    color="red"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
});
