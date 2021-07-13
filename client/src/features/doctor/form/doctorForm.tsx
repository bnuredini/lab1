import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function DoctorForm () {

    const {doctorStore} = useStore();
    const {selectedDoctor, closeForm, createDoctor, updateDoctor, loading} = doctorStore;    
    
    const initialState = selectedDoctor ?? {
        id: '',
        type: '',
    }

    const [doctor, setDoctor] = useState(initialState);

    function handleSubmit() {
        doctor.id ? updateDoctor(doctor) : createDoctor(doctor);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setDoctor({...doctor, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Type' value={doctor.type} name='type' onChange={handleInputChange} />              
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})