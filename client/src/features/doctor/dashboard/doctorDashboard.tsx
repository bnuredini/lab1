import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";
import { Doctor } from "../../../app/models/doctor";
import DoctorList from "./doctorList";
import DoctorDetails from "../details/doctorDetails";
import DoctorForm from "../form/doctorForm";

interface Props{
    doctors: Doctor[];
}

export default observer(function ArticleDashboard({doctors}: Props) {

    const {doctorStore} = useStore();
    const {selectedDoctor, editMode} = doctorStore; 

    return(
        <Grid>
            
            <Grid.Column width='10'>
            <DoctorList />
            </Grid.Column>
            <Grid.Column width='6' fluid>
                { selectedDoctor && !editMode &&
            <DoctorDetails
            />}
            { editMode &&
            <DoctorForm />}
            </Grid.Column>
        </Grid>
    )
})
