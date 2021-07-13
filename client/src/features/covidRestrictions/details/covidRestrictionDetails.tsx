import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function CovidRestrictionDetails () {

    const {covidRestrictionStore} = useStore();
    const {selectedCovidRestriction: covidRestriction, openForm, cancelSelectedCovidRestriction} = covidRestrictionStore

    if (!covidRestriction) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
        <Card.Header>{covidRestriction?.type}</Card.Header>
        <Card.Description>{covidRestriction?.from}</Card.Description>
        <Card.Description>{covidRestriction?.until}</Card.Description>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(covidRestriction.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedCovidRestriction} basic color='red' type='danger' content='Cancel' />
        </Button.Group>
            </Card.Content>
        </Card>
    )
}
