import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function DoctorList() {
    const {doctorStore} = useStore();
    const {deleteDoctor, doctors, loading} =doctorStore
    const [target, setTarget] = useState('');


    function handleDoctorDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteDoctor(id);
    }

    
    return(
        <Segment>
            <Item.Group divided>
                {doctors.map(doctor => (
                    <Item key={doctor.id}>
                        <Item.Content>
                            <Item.Header as='a'>{doctor.type}</Item.Header>
                            <Item.Extra>
                                <Button onClick={() => doctorStore.selectDoctor(doctor.id)} floated='right' content='View' positive />
                                <Button name={doctor.id} loading={loading && target === doctor.id} onClick={(e) => handleDoctorDelete(e, doctor.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
