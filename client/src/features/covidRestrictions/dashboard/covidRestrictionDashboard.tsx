import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { CovidRestriction } from "../../../app/models/covidRestriction";
import { useStore } from "../../../app/stores/store";
import CovidRestrictionList from "./covidRestrictionList";
import CovidRestrictionDetails from "../details/covidRestrictionDetails";
import CovidRestrictionForm from "../form/covidRestrictionForm";

interface Props{
    covidRestrictions: CovidRestriction[];
}

export default observer(function CovidRestrictionDashboard({covidRestrictions}: Props) {

    const {covidRestrictionStore} = useStore();
    const {selectedCovidRestriction, editMode} = covidRestrictionStore; 

    return(
        <Grid>
            
            <Grid.Column width='10'>
            <CovidRestrictionList />
            </Grid.Column>
            <Grid.Column width='6' fluid>
                { selectedCovidRestriction && !editMode &&
            <CovidRestrictionDetails 
            />}
            { editMode &&
            <CovidRestrictionForm />}
            </Grid.Column>
        </Grid>
    )
})
