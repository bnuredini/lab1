import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function TestConfirmationList() {
    const {testConfirmationStore} = useStore();
    const {deleteTestConfirmation, testConfirmations, loading} =testConfirmationStore
    const [target, setTarget] = useState('');


    function handleTestConfirmationDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteTestConfirmation(id);
    }

    
    return(
        <Segment>
            <Item.Group divided>
                {testConfirmations.map(testConfirmation => (
                    <Item key={testConfirmation.id}>
                        <Item.Content>
                            <Item.Header as='a'>{testConfirmation.email}</Item.Header>
                            <Item.Description>
                                <div>
                                {testConfirmation.testName}
                                </div>
                                <div>
                                {testConfirmation.location}
                                </div>
                                <div>
                                {testConfirmation.date}
                                </div>
                                </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => testConfirmationStore.selectTestConfirmation(testConfirmation.id)} floated='right' content='View' positive />
                                <Button name={testConfirmation.id} loading={loading && target === testConfirmation.id} onClick={(e) => handleTestConfirmationDelete(e, testConfirmation.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
