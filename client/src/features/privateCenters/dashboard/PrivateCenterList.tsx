import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function PrivateCenterList() {
  const { privateCenterStore } = useStore();
  const { deletePrivateCenter, loading, privateCenters} = privateCenterStore;
  const [target, setTarget] = useState("");

  function handlePrivateCenterDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deletePrivateCenter(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {privateCenters.map(privateCenter => {

          return (
            <Item key={privateCenter.id}>
              <Item.Content>
                <Item.Header as="a">{privateCenter.name}</Item.Header>
                <Item.Description>
                  <div>{privateCenter.location}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => privateCenterStore.selectPrivateCenter(privateCenter.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={privateCenter.id}
                    loading={loading && target === privateCenter.id}
                    onClick={(e) => handlePrivateCenterDelete(e, privateCenter.id)}
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
