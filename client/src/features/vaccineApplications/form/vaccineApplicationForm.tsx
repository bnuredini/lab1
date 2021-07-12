import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function VaccineApplicationForm () {

    const {vaccineApplicationStore} = useStore();
    const {selectedVaccineApplication, closeForm, createVaccineApplication, updateVaccineApplication, loading} = vaccineApplicationStore;    
    
    const initialState = selectedVaccineApplication ?? {
        id: '',
        type: '',
        date: null,
        email: '',
        location: '',
    }

    const [vaccineApplication, setVaccineApplication] = useState(initialState);

    function handleSubmit() {
        vaccineApplication.id ? updateVaccineApplication(vaccineApplication) : createVaccineApplication(vaccineApplication);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setVaccineApplication({...vaccineApplication, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Type' value={vaccineApplication.type} name='type' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={vaccineApplication.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Email' value={vaccineApplication.email} name='email' onChange={handleInputChange} />
                <Form.Input placeholder='Location' value={vaccineApplication.location} name='location' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
