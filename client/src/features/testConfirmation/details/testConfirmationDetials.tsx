import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function TestConfirmationDetails () {

    const {testConfirmationStore} = useStore();
    const {selectedTestConfirmation: testConfirmation, openForm, cancelSelectedTestConfirmation} = testConfirmationStore

    if (!testConfirmation) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
        <Card.Header>{testConfirmation.testName}</Card.Header>
        <Card.Description>{testConfirmation.date}</Card.Description>
        <Card.Description>{testConfirmation.email}</Card.Description>
        <Card.Description>{testConfirmation.location}</Card.Description>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(testConfirmation.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedTestConfirmation} basic color='red' type='danger' content='Cancel' />
        </Button.Group>
            </Card.Content>
        </Card>
    )
}
