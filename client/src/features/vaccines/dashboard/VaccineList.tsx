import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function VaccineList() {
  const { vaccineStore } = useStore();
  const { deleteVaccine, vaccines, loading} = vaccineStore;
  const [target, setTarget] = useState("");

  function handleVaccineDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteVaccine(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {vaccines.map(vaccine => {
          // replace w/ the current users id
          // if (test.patientId !== 12332) return;

          return (
            <Item key={vaccine.id}>
              <Item.Content>
                <Item.Header as="a">{vaccine.name}</Item.Header>
                <Item.Description>
                  <div>{vaccine.efficacy}</div>
                  <div>
                    {vaccine.creator}, {vaccine.type}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => vaccineStore.selectVaccine(vaccine.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={vaccine.id}
                    loading={loading && target === vaccine.id}
                    onClick={(e) => handleVaccineDelete(e, vaccine.id)}
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
