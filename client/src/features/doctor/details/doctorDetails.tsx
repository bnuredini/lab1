import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function DoctorDetails () {

    const {doctorStore} = useStore();
    const {selectedDoctor: doctor, openForm, cancelSelectedDoctor} = doctorStore

    if (!doctor) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
        <Card.Header>{doctor.type}</Card.Header>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(doctor.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedDoctor} basic color='red' type='danger' content='Cancel' />
        </Button.Group>
            </Card.Content>
        </Card>
    )
}
