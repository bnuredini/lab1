import React, { useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import VaccineApplicationDashboard from './dashboard/vaccineApplicationDashboard';


function VaccineApplication() {

  const {vaccineApplicationStore} = useStore();


 useEffect(() => {
    vaccineApplicationStore.loadVaccineApplication();
 }, [vaccineApplicationStore])



 if (vaccineApplicationStore.loadingIntial) return <LoadingComponent content = 'Loading...' />

  return (
   <>
      <Container style={{marginTop: '7em'}}>
      <Button positive content='Apliko' style={{marginBottom: '1rem'}} onClick = {() => vaccineApplicationStore.openForm()} />
        <VaccineApplicationDashboard
        vaccineApplications={vaccineApplicationStore.vaccineApplications}
        />   
      </Container>  
   </>
  );
}

export default observer(VaccineApplication);
