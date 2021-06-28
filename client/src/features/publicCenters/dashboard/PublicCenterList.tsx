import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function PublicCenterList() {
  const { publicCenterStore } = useStore();
  const { deletePublicCenter, loading, publicCenters} = publicCenterStore;
  const [target, setTarget] = useState("");

  function handlePublicCenterDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deletePublicCenter(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {publicCenters.map(publicCenter => {

          return (
            <Item key={publicCenter.id}>
              <Item.Content>
                <Item.Header as="a">{publicCenter.name}</Item.Header>
                <Item.Description>
                  <div>{publicCenter.location}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => publicCenterStore.selectPublicCenter(publicCenter.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={publicCenter.id}
                    loading={loading && target === publicCenter.id}
                    onClick={(e) => handlePublicCenterDelete(e, publicCenter.id)}
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
