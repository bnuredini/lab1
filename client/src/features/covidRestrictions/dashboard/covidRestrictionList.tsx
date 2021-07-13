import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function CovidRestrictionList() {
    const {covidRestrictionStore} = useStore();
    const {deleteCovidRestriction, covidRestrictions, loading} = covidRestrictionStore
    const [target, setTarget] = useState('');


    function handleCovidRestrictionDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteCovidRestriction(id);
    }

    
    return(
        <Segment>
            <Item.Group divided>
                {covidRestrictions.map(covidRestriction => (
                    <Item key={covidRestriction.id}>
                        <Item.Content>
                            <Item.Header as='a'>{covidRestriction.type}</Item.Header>
                            <Item.Description>
                                <div>
                                {covidRestriction.from}
                                </div>
                                <div>
                                {covidRestriction.until}
                                </div>
                                </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => covidRestrictionStore.selectCovidRestriction(covidRestriction.id)} floated='right' content='View' positive />
                                <Button name={covidRestriction.id} loading={loading && target === covidRestriction.id} onClick={(e) => handleCovidRestrictionDelete(e, covidRestriction.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
