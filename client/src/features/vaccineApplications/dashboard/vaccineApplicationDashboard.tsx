import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { VaccineApplication } from "../../../app/models/vaccineApplication";
import VaccineApplicationList from "./vaccineApplicationList";
import VaccineApplicationDetails from "../details/vaccineApplicationDetails";
import VaccineApplicationForm from "../form/vaccineApplicationForm";

interface Props{
    vaccineApplications: VaccineApplication[];
}

export default observer(function VaccineApplicationDashboard({vaccineApplications}: Props) {

    const {vaccineApplicationStore} = useStore();
    const {selectedVaccineApplication, editMode} = vaccineApplicationStore; 

    return(
        <Grid>
            
            <Grid.Column width='10'>
            <VaccineApplicationList />
            </Grid.Column>
            <Grid.Column width='6' fluid>
                { selectedVaccineApplication && !editMode &&
            <VaccineApplicationDetails
            />}
            { editMode &&
            <VaccineApplicationForm
            />}
            </Grid.Column>
        </Grid>
    )
})
