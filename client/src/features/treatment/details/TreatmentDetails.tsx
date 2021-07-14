import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function TreaatmentDetails () {

    const {treatmentStore} = useStore();
    const {selectedTreatment: treatment, openForm, cancelSelectedTreatment} = treatmentStore

    if (!treatment) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
        <Card.Header>{treatment.description}</Card.Header>
        <Card.Description>{treatment.date}</Card.Description>
        <Card.Description>{treatment.doctor}</Card.Description>
        <Card.Description>{treatment.patient}</Card.Description>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(treatment.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedTreatment} basic color='red' type='danger' content='Cancel' />
        </Button.Group>
            </Card.Content>
        </Card>
    )
}
