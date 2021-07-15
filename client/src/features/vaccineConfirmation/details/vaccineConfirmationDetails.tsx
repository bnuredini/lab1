import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function VaccineConfirmationDetails () {

    const {vaccineConfirmationStore} = useStore();
    const {selectedVaccineConfirmation: vaccineConfirmation, openForm, cancelSelectedVaccineConfirmation} = vaccineConfirmationStore

    if (!vaccineConfirmation) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
        <Card.Header>{vaccineConfirmation.vaccineName}</Card.Header>
        <Card.Description>{vaccineConfirmation.date}</Card.Description>
        <Card.Description>{vaccineConfirmation.email}</Card.Description>
        <Card.Description>{vaccineConfirmation.location}</Card.Description>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(vaccineConfirmation.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedVaccineConfirmation} basic color='red' type='danger' content='Cancel' />
        </Button.Group>
            </Card.Content>
        </Card>
    )
}
