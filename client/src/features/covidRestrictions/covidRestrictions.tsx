import React, { useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import CovidRestrictionDashboard from './dashboard/covidRestrictionDashboard';

function CovidRestrictions() {

  const {covidRestrictionStore} = useStore();


 useEffect(() => {
    covidRestrictionStore.loadCovidRestriction();
 }, [covidRestrictionStore])



 if (covidRestrictionStore.loadingIntial) return <LoadingComponent content = 'Loading Regulations...' />

  return (
   <>
      <Container style={{marginTop: '7em'}}>
      <Button positive content='Shto Rregullore' style={{marginBottom: '1rem'}} onClick = {() => covidRestrictionStore.openForm()} />
        <CovidRestrictionDashboard
        covidRestrictions={covidRestrictionStore.covidRestrictions}
        />   
      </Container>  
   </>
  )
}

export default observer(CovidRestrictions);