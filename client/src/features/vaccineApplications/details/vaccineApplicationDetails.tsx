import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function VaccineApplicationDetails () {

    const {vaccineApplicationStore} = useStore();
    const {selectedVaccineApplication: vaccineApplication, openForm, cancelSelectedVaccineApplication} = vaccineApplicationStore

    if (!vaccineApplication) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
        <Card.Header>{vaccineApplication.type}</Card.Header>
        <Card.Description>{vaccineApplication.date}</Card.Description>
        <Card.Description>{vaccineApplication.email}</Card.Description>
        <Card.Description>{vaccineApplication.location}</Card.Description>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(vaccineApplication.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedVaccineApplication} basic color='red' type='danger' content='Cancel' />
        </Button.Group>
            </Card.Content>
        </Card>
    )
}
