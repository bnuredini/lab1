import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';


export default observer (function PatientForm(){
    const history= useHistory();
    const {patientStore}= useStore();
    const {createPatient,updatePatient, 
    loading, loadPatient, loadingInitial} = patientStore;
    const {id}=useParams<{id:string}>();
    const [patient, setPatient]= useState({
        id: '',
        full_Name: '',
        birthday: '',
        gender: '',
        phone_Number: '',
        email: '',
        address: ''

    });
    useEffect(() => {
        if(id)loadPatient(id).then(patient=> setPatient(patient!))
    }, [id, loadPatient]);

    function handleSubmit(){
       if(patient.id.length===0){
           let newPatient={
               ...patient,
               id:uuid()
           };
           createPatient(newPatient).then(() => history.push(`/patients/${newPatient.id}`))
       }

       else{
           updatePatient(patient).then(() =>history.push(`/patients/${patient.id}`))
       }

    }
    function handleInputChange(event: ChangeEvent <HTMLInputElement>){
        const {name, value}= event.target;
        setPatient({...patient, [name]: value})
    } 
    if(loadingInitial) return <LoadingComponent content='Loading patient...'/>  
    return(

        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Full_Name' value={patient.full_Name} name='full_Name' onChange={handleInputChange}/>
                <Form.Input type ='date' placeholder='Birthday'value={patient.birthday} name='birthday' onChange={handleInputChange}/>
                <Form.Input placeholder='Gender'value={patient.gender} name='gender' onChange={handleInputChange}/>
                <Form.Input placeholder='Phone_Number'value={patient.phone_Number} name='phone_Number' onChange={handleInputChange}/>
                <Form.Input placeholder='Email'value={patient.email} name='email' onChange={handleInputChange}/>
                <Form.Input placeholder='Address'value={patient.address} name='address' onChange={handleInputChange}/>
                <Button loading={loading} floated ='right' positive type ='submit' content='Submit'/>
                <Button as={Link} to='/patients' floated ='right' type ='button' content='Cancel'/>

            </Form>


        </Segment>


    )
    })