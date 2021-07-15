import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function LocationForm () {

    const {locationStore} = useStore();
    const {selectedLocation, closeForm, createLocation, updateLocation, loading} = locationStore;    
    
    const initialState = selectedLocation ?? {
        id: '',
        name: '',
        zipCode: 0,
        infections: 0,
        vaccinated: 0,
        tested: 0,
    }

    const [location, setLocation] = useState(initialState);

    function handleSubmit() {
        location.id ? updateLocation(location) : createLocation(location);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setLocation({...location, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={location.name} name='name' onChange={handleInputChange} />
                <Form.Input placeholder='Zip Code' value={location.zipCode} name='zipCode' onChange={handleInputChange} />
                <Form.Input placeholder='Infections' value={location.infections} name='infections' onChange={handleInputChange} />
                <Form.Input placeholder='Vaccinated' value={location.vaccinated} name='vaccinated' onChange={handleInputChange} />
                <Form.Input placeholder='Tested' value={location.tested} name='tested' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
