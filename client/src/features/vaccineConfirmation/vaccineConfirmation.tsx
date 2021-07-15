import React, { useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import VaccineConfirmationDashboard from './dashboard/vaccineConfirmationDashboard';

function VaccineConfirmation() {

  const {vaccineConfirmationStore} = useStore();


 useEffect(() => {
    vaccineConfirmationStore.loadVaccineConfirmation();
 }, [vaccineConfirmationStore])



 if (vaccineConfirmationStore.loadingIntial) return <LoadingComponent content = 'Loading Vaccine Confirmations...' />

  return (
   <>
      <Container style={{marginTop: '7em'}}>
      <Button positive content='Confirm new vaccine taken' style={{marginBottom: '1rem'}} onClick = {() => vaccineConfirmationStore.openForm()} />
        <VaccineConfirmationDashboard
        vaccineConfirmations={vaccineConfirmationStore.vaccineConfirmations}
        />   
      </Container>  
   </>
  );
}

export default observer(VaccineConfirmation);
