import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function VaccineApplicationList() {
    const {vaccineApplicationStore} = useStore();
    const {deleteVaccineApplication, vaccineApplications, loading} = vaccineApplicationStore
    const [target, setTarget] = useState('');


    function handleVaccineApplicationDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteVaccineApplication(id);
    }

    
    return(
        <Segment>
            <Item.Group divided>
                {vaccineApplications.map(vaccineApplication => (
                    <Item key={vaccineApplication.id}>
                        <Item.Content>
                            <Item.Header as='a'>{vaccineApplication.type}</Item.Header>
                            <Item.Description>
                                <div>
                                {vaccineApplication.email}
                                </div>
                                <div>
                                {vaccineApplication.date}
                                </div>
                                <div>
                                {vaccineApplication.location}
                                </div>
                                </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => vaccineApplicationStore.selectVaccineApplication(vaccineApplication.id)} floated='right' content='View' positive />
                                <Button name={vaccineApplication.id} loading={loading && target === vaccineApplication.id} onClick={(e) =>  handleVaccineApplicationDelete(e, vaccineApplication.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
