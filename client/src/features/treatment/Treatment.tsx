import React, { useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import TreatmentDashboard from './dashboard/TreatmentDashboard';

function Treatment() {

  const {treatmentStore} = useStore();


 useEffect(() => {
   treatmentStore.loadTreatments();
 }, [treatmentStore])



 if (treatmentStore.loadingIntial) return <LoadingComponent content = 'Loading Treatments...' />

  return (
   <>
      <Container style={{marginTop: '7em'}}>
      <Button positive content='Create Treatment' style={{marginBottom: '1rem'}} onClick = {() => treatmentStore.openForm()} />
        <TreatmentDashboard
        treatments={treatmentStore.treatments}
        />   
      </Container>  
   </>
  );
}

export default observer(Treatment);
