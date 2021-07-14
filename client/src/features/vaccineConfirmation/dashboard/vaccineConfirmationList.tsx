import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function VaccineConfirmationList() {
    const {vaccineConfirmationStore} = useStore();
    const {deleteVaccineConfirmation, vaccineConfirmations, loading} =vaccineConfirmationStore
    const [target, setTarget] = useState('');


    function handleVaccineConfirmationDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteVaccineConfirmation(id);
    }

    
    return(
        <Segment>
            <Item.Group divided>
                {vaccineConfirmations.map(vaccineConfirmation => (
                    <Item key={vaccineConfirmation.id}>
                        <Item.Content>
                            <Item.Header as='a'>{vaccineConfirmation.email}</Item.Header>
                            <Item.Description>
                                <div>
                                {vaccineConfirmation.vaccineName}
                                </div>
                                <div>
                                {vaccineConfirmation.location}
                                </div>
                                <div>
                                {vaccineConfirmation.date}
                                </div>
                                </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => vaccineConfirmationStore.selectVaccineConfirmation(vaccineConfirmation.id)} floated='right' content='View' positive />
                                <Button name={vaccineConfirmation.id} loading={loading && target === vaccineConfirmation.id} onClick={(e) => handleVaccineConfirmationDelete(e, vaccineConfirmation.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
