import React, { useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import TestConfirmationDashboard from './dashboard/testConfirmationDashboard';

function TestConfirmation() {

  const {testConfirmationStore} = useStore();


 useEffect(() => {
    testConfirmationStore.loadTestConfirmation();
 }, [testConfirmationStore])



 if (testConfirmationStore.loadingInitial) return <LoadingComponent content = 'Loading Test Confirmations...' />

  return (
   <>
      <Container style={{marginTop: '7em'}}>
      <Button positive content='Confirm new test' style={{marginBottom: '1rem'}} onClick = {() => testConfirmationStore.openForm()} />
        <TestConfirmationDashboard
        testConfirmations={testConfirmationStore.testConfirmations}
        />   
      </Container>  
   </>
  );
}

export default observer(TestConfirmation);
