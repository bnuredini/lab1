import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function VaccineConfirmationForm () {

    const {vaccineConfirmationStore} = useStore();
    const {selectedVaccineConfirmation, closeForm, createVaccineConfirmation, updateVaccineConfirmation, loading} = vaccineConfirmationStore;    
    
    const initialState = selectedVaccineConfirmation ?? {
        id: '',
        email: '',
        date: null,
        vaccineName: '',
        location:'',
    }

    const [vaccineConfirmation, setVaccineConfirmation] = useState(initialState);

    function handleSubmit() {
        vaccineConfirmation.id ? updateVaccineConfirmation(vaccineConfirmation) : createVaccineConfirmation(vaccineConfirmation);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setVaccineConfirmation({...vaccineConfirmation, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='TestName' value={vaccineConfirmation.vaccineName} name='vaccineName' onChange={handleInputChange} />
                <Form.Input placeholder='Email' value={vaccineConfirmation.email} name='email' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={vaccineConfirmation.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Location' value={vaccineConfirmation.location} name='location' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
