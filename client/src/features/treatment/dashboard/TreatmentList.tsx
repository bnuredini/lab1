import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function TreatmentList() {
    const {treatmentStore} = useStore();
    const {deleteTreatment, treatments, loading} = treatmentStore
    const [target, setTarget] = useState('');


    function handleTreatmentDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteTreatment(id);
    }

    
    return(
        <Segment>
            <Item.Group divided>
                {treatments.map(treatment => (
                    <Item key={treatment.id}>
                        <Item.Content>
                            <Item.Header as='a'>{treatment.description}</Item.Header>
                            <Item.Description>
                                <div>
                                {treatment.date}
                                </div>
                                <div>
                                {treatment.doctor}
                                </div>
                                <div>
                                {treatment.patient}
                                </div>
                                </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => treatmentStore.selectTreatment(treatment.id)} floated='right' content='View' positive />
                                <Button name={treatment.id} loading={loading && target === treatment.id} onClick={(e) => handleTreatmentDelete(e, treatment.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
