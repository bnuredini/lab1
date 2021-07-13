import React, { useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import DoctorDashboard from './dashboard/doctorDashboard';

function Doctor() {

  const {doctorStore} = useStore();


 useEffect(() => {
   doctorStore.loadDoctor();
 }, [doctorStore])



 if (doctorStore.loadingIntial) return <LoadingComponent content = 'Loading Doctors...' />

  return (
   <>
      <Container style={{marginTop: '7em'}}>
      <Button positive content='Add Doctor' style={{marginBottom: '1rem'}} onClick = {() => doctorStore.openForm()} />
        <DoctorDashboard
        doctors={doctorStore.doctors}
        />   
      </Container>  
   </>
  );
}

export default observer(Doctor);
