import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function DrugList() {
  const { drugStore } = useStore();
  const { deleteDrug, drugs, loading } = drugStore;
  const [target, setTarget] = useState("");

  function handleDrugDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteDrug(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {drugs.map((drug) => {
          return (
            <Item key={drug.id}>
              <Item.Content>
                <Item.Header as="a">{drug.name}</Item.Header>
                <Item.Description>
                  <div>{drug.description}</div>
                  <div>
                    {drug.type}, {drug.sideEffects}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => drugStore.selectDrug(drug.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={drug.id}
                    loading={loading && target === drug.id}
                    onClick={(e) => handleDrugDelete(e, drug.id)}
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