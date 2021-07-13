import React, { useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import LocationDashboard from './dashboard/locationDashboard';

function Location() {

  const {locationStore} = useStore();


 useEffect(() => {
   locationStore.loadLocation();
 }, [locationStore])



 if (locationStore.loadingIntial) return <LoadingComponent content = 'Loading Locations...' />

  return (
   <>
      <Container style={{marginTop: '7em'}}>
      <Button positive content='Add Location' style={{marginBottom: '1rem'}} onClick = {() => locationStore.openForm()} />
        <LocationDashboard
        locations={locationStore.locations}
        />   
      </Container>  
   </>
  );
}

export default observer(Location);
