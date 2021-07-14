import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function TreatmentForm () {

    const {treatmentStore} = useStore();
    const {selectedTreatment, closeForm, createTreatment, updateTreatment, loading} = treatmentStore;    
    
    const initialState = selectedTreatment ?? {
        id: '',
        description: '',
        patient: '',
        doctor: '',
        date: null,
    }

    const [treatment, setTreatment] = useState(initialState);

    function handleSubmit() {
        treatment.id ? updateTreatment(treatment) : createTreatment(treatment);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setTreatment({...treatment, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Description' value={treatment.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Doctor' value={treatment.doctor} name='doctor' onChange={handleInputChange} />
                <Form.Input placeholder='Patient' value={treatment.patient} name='patient' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={treatment.date} name='date' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
