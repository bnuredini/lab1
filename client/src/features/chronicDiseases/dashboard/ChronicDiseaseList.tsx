import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ChronicDiseaseList() {
  const { chronicDiseaseStore } = useStore();
  const { deleteChronicDisease, loading, chronicDiseases} = chronicDiseaseStore;
  const [target, setTarget] = useState("");

  function handleChronicDiseaseDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteChronicDisease(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {chronicDiseases.map(chronicDisease => {

          return (
            <Item key={chronicDisease.id}>
              <Item.Content>
                <Item.Header as="a">{chronicDisease.name}</Item.Header>
                <Item.Extra>
                  <Button
                    onClick={() => chronicDiseaseStore.selectChronicDisease(chronicDisease.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={chronicDisease.id}
                    loading={loading && target === chronicDisease.id}
                    onClick={(e) => handleChronicDiseaseDelete(e, chronicDisease.id)}
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
