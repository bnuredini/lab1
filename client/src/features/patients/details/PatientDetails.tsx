import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { format } from "date-fns";

export default observer(function PatientDetails() {
  const { patientStore } = useStore();
  const {
    selectedPatient: patient,
    loadPatient,
    loadingInitial,
    openForm,
    cancelSelectedPatient,
  } = patientStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadPatient(id);
  }, [id, loadPatient]);

  if (loadingInitial || !patient) return <LoadingComponent />;
  return (
    <Card fluid>
      {/* <Image src={`/assets/categoryImages/${patient.phone_Number}.jpg`} /> */}
      <Card.Content>
        <Card.Header>{patient.full_Name}</Card.Header>
        <Card.Meta>
          <span>{format(patient.birthday!, "dd.MM.yyyy, (h:mm aa)")}</span>
        </Card.Meta>
        <Card.Description>{patient.gender}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(patient.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedPatient}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
