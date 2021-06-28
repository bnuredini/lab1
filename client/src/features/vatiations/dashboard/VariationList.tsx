import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function VariationList() {
  const { variationStore } = useStore();
  const { deleteVariation, loading, variations} = variationStore;
  const [target, setTarget] = useState("");

  function handleVariationDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteVariation(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {variations.map(variation => {

          return (
            <Item key={variation.id}>
              <Item.Content>
                <Item.Header as="a">{variation.name}</Item.Header>
                <Item.Extra>
                  <Button
                    onClick={() => variationStore.selectVariation(variation.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={variation.id}
                    loading={loading && target === variation.id}
                    onClick={(e) => handleVariationDelete(e, variation.id)}
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
