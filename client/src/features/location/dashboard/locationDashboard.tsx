import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Location } from "../../../app/models/location";
import LocationList from "./locationList";
import LocationDetails from "../details/locationDetails";
import LocationForm from "../form/locationForm";

interface Props{
    locations: Location[];
}

export default observer(function LocationDashboard({locations}: Props) {

    const {locationStore} = useStore();
    const {selectedLocation, editMode} = locationStore; 

    return(
        <Grid>
            
            <Grid.Column width='10'>
            <LocationList />
            </Grid.Column>
            <Grid.Column width='6' fluid>
                { selectedLocation && !editMode &&
            <LocationDetails
            />}
            { editMode &&
            <LocationForm />}
            </Grid.Column>
        </Grid>
    )
})
