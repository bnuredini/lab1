import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function PatientListx() {
  const { patientStore } = useStore();
  const { deletePatient, patientsByDate, loading } = patientStore;
  const [target, setTarget] = useState("");

  function handlePatientDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deletePatient(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {patientsByDate.map((patient) => (
          <Item key={patient.id}>
            <Item.Content>
              <Item.Header as="a">{patient.full_Name}</Item.Header>
              <Item.Meta>{format (patient.birthday!, 'dd.MM.yyyy, (h:mm aa)')}</Item.Meta>
              <Item.Description>
                <div>{patient.gender}</div>
                <div>{patient.address}</div>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
