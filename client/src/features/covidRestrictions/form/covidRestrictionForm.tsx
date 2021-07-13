import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function CovidRestrictionForm () {

    const {covidRestrictionStore} = useStore();
    const {selectedCovidRestriction, closeForm, createCovidRestriction, updateCovidRestriction, loading} = covidRestrictionStore;    
    
    const initialState = selectedCovidRestriction ?? {
        id: '',
        type: '',
        from: null,
        until: null,
    }

    const [covidRestriction, setCovidRestriction] = useState(initialState);

    function handleSubmit() {
        covidRestriction.id ? updateCovidRestriction(covidRestriction) : createCovidRestriction(covidRestriction);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setCovidRestriction({...covidRestriction, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Restriction' value={covidRestriction.type} name='type' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='From' value={covidRestriction.from} name='from' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Until' value={covidRestriction.until} name='until' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
