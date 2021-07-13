import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function LocationList() {
    const {locationStore} = useStore();
    const {deleteLocation, locations, loading} =locationStore
    const [target, setTarget] = useState('');


    function handleLocationDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteLocation(id);
    }

    
    return(
        <Segment>
            <Item.Group divided>
                {locations.map(location => (
                    <Item key={location.id}>
                        <Item.Content>
                            <Item.Header as='a'>{location.name}</Item.Header>
                            <Item.Description>
                                <div>
                                {location.zipCode}
                                </div>
                                <div>
                                {location.infections}
                                </div>
                                <div>
                                {location.vaccinated}
                                </div>
                                <div>
                                {location.tested}
                                </div>
                                </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => locationStore.selectLocation(location.id)} floated='right' content='View' positive />
                                <Button name={location.id} loading={loading && target === location.id} onClick={(e) => handleLocationDelete(e, location.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
