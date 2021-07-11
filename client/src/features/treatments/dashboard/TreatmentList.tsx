import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function TreatmentList() {
  const { treatmentStore } = useStore();
  const { deleteTreatment, treatments, loading } = treatmentStore;
  const [target, setTarget] = useState("");

  function handleTreatmentDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteTreatment(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {treatments.map((treatment) => {
          return (
            <Item key={treatment.id}>
              <Item.Content>
                <Item.Header as="a">{treatment.description}</Item.Header>
                <Item.Description>
                <Item.Meta>{format (treatment.date!, 'dd.MM.yyyy, (h:mm aa)')}</Item.Meta>
                <Item.Description>
                <div>{treatment.patient}</div>
                <div>{treatment.doctor}</div>
              </Item.Description>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => treatmentStore.selectTreatment(treatment.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={treatment.id}
                    loading={loading && target === treatment.id}
                    onClick={(e) => handleTreatmentDelete(e, treatment.id)}
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