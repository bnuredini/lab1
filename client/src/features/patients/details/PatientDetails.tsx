import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function PatientDetails() {
  const { patientStore } = useStore();
  const {
    selectedPatient: patient,
    loadPatient,
    loadingInitial,
  } = patientStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadPatient(id);
  }, [id, loadPatient]);

  if (loadingInitial || !patient) return <LoadingComponent />;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${patient.phone_Number}.jpg`} />
      <Card.Content>
        <Card.Header>{patient.full_Name}</Card.Header>
        <Card.Meta>
          <span>{patient.birthday}</span>
        </Card.Meta>
        <Card.Description>{patient.gender}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width="2">
          <Button
            as={Link}
            to={`/manage/${patient.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to="/patients"
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
