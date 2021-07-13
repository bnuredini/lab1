import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function AllergyList() {
  const { allergyStore } = useStore();
  const { deleteAllergy, loading, allergies} = allergyStore;
  const [target, setTarget] = useState("");

  function handleAllergyDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteAllergy(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {allergies.map(allergy => {

          return (
            <Item key={allergy.id}>
              <Item.Content>
                <Item.Header as="a">{allergy.type}</Item.Header>
                <Item.Description>
                  <div>{allergy.causes}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => allergyStore.selectAllergy(allergy.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={allergy.id}
                    loading={loading && target === allergy.id}
                    onClick={(e) => handleAllergyDelete(e, allergy.id)}
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
