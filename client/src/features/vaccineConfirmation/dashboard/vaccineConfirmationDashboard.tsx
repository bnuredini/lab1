import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { VaccineConfirmation } from "../../../app/models/vaccineConfirmation";
import VaccineConfirmationList from "./vaccineConfirmationList";
import VaccineConfirmationDetails from "../details/vaccineConfirmationDetails";
import VaccineConfirmationForm from "../form/vaccineConfirmationForm";


interface Props{
    vaccineConfirmations: VaccineConfirmation[];
}

export default observer(function VaccineConfirmationDashboard({vaccineConfirmations}: Props) {

    const {vaccineConfirmationStore} = useStore();
    const {selectedVaccineConfirmation, editMode} = vaccineConfirmationStore; 

    return(
        <Grid>
            
            <Grid.Column width='10'>
            <VaccineConfirmationList />
            </Grid.Column>
            <Grid.Column width='6' fluid>
                { selectedVaccineConfirmation && !editMode &&
            <VaccineConfirmationDetails 
            />}
            { editMode &&
            <VaccineConfirmationForm
            />}
            </Grid.Column>
        </Grid>
    )
})
