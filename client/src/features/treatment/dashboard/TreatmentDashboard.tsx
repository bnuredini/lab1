import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Treatment } from "../../../app/models/treatment";
import TreatmentList from "./TreatmentList";
import TreaatmentDetails from "../details/TreatmentDetails";
import TreatmentForm from "../form/TreatmentForm";

interface Props{
    treatments: Treatment[];
}

export default observer(function ArticleDashboard({treatments}: Props) {

    const {treatmentStore} = useStore();
    const {selectedTreatment, editMode} = treatmentStore; 

    return(
        <Grid>
            
            <Grid.Column width='10'>
            <TreatmentList />
            </Grid.Column>
            <Grid.Column width='6' fluid>
                { selectedTreatment && !editMode &&
            <TreaatmentDetails
            />}
            { editMode &&
            <TreatmentForm
            />}
            </Grid.Column>
        </Grid>
    )
})
