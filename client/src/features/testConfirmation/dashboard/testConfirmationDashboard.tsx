import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { TestConfirmation } from "../../../app/models/testConfirmation";
import TestConfirmationList from "./testConfirmationList";
import TestConfirmationDetails from "../details/testConfirmationDetials";
import TestConfirmationForm from "../form/testConfirmationForm";


interface Props{
    testConfirmations: TestConfirmation[];
}

export default observer(function TestConfirmationDashboard({testConfirmations}: Props) {

    const {testConfirmationStore} = useStore();
    const {selectedTestConfirmation, editMode} = testConfirmationStore; 

    return(
        <Grid>
            
            <Grid.Column width='10'>
            <TestConfirmationList />
            </Grid.Column>
            <Grid.Column width='6' fluid>
                { selectedTestConfirmation && !editMode &&
            <TestConfirmationDetails 
            />}
            { editMode &&
            <TestConfirmationForm
            />}
            </Grid.Column>
        </Grid>
    )
})
