import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer (function PatientList(){

    const {patientStore} = useStore();
    const {deletePatient, patientsByDate, loading} = patientStore;
    const [target, setTarget]= useState('');


    function handlePatientDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deletePatient(id);
    }

    
    return (
        <Segment>

            <Item.Group divided>
                {patientsByDate.map(patient => (
                    <Item key={patient.id}>
                        <Item.Content>
                            <Item.Header as='a'>{patient.full_Name}</Item.Header>
                            <Item.Meta>{patient.birthday}</Item.Meta>
                            <Item.Description>
                                <div>{patient.gender}</div>
                                <div>{patient.address}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/patients/${patient.id}`}floated='right' content='View' color='blue'/>
                                <Button 
                                name={patient.id}
                                loading={loading && target === patient.id} 
                                onClick={(e)=> handlePatientDelete(e, patient.id)}
                                floated='right'
                                 content='Delete' 
                                 color='red'/>
                                <Label basic content={patient.phone_Number}/>
                            </Item.Extra>

                        </Item.Content>

                   </Item>
                ))}
            </Item.Group>
        </Segment>
    )

})