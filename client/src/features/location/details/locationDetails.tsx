import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function LocationDetails () {

    const {locationStore} = useStore();
    const {selectedLocation: location, openForm, cancelSelectedLocation} = locationStore

    if (!location) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
        <Card.Header>{location.name}</Card.Header>
        <Card.Description>{location.zipCode}</Card.Description>
        <Card.Description>{location.infections}</Card.Description>
        <Card.Description>{location.vaccinated}</Card.Description>
        <Card.Description>{location.tested}</Card.Description>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(location.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedLocation} basic color='red' type='danger' content='Cancel' />
        </Button.Group>
            </Card.Content>
        </Card>
    )
}