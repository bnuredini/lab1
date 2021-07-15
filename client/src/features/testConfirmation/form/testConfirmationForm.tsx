import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function TestConfirmationForm () {

    const {testConfirmationStore} = useStore();
    const {selectedTestConfirmation, closeForm, createTestConfirmation, updateTestConfirmation, loading} = testConfirmationStore;    
    
    const initialState = selectedTestConfirmation ?? {
        id: '',
        email:'',
        date: null,
        testName: '',
        location:'',
    }

    const [testConfirmation, setTestConfirmation] = useState(initialState);

    function handleSubmit() {
        testConfirmation.id ? updateTestConfirmation(testConfirmation) : createTestConfirmation(testConfirmation);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setTestConfirmation({...testConfirmation, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='TestName' value={testConfirmation.testName} name='testName' onChange={handleInputChange} />
                <Form.Input placeholder='Email' value={testConfirmation.email} name='email' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={testConfirmation.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Location' value={testConfirmation.location} name='location' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
