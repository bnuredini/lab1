import React, { useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import ArticleDashboard from './dashboard/articleDashboard';

function Article() {

  const {articleStore} = useStore();


 useEffect(() => {
   articleStore.loadArticles();
 }, [articleStore])



 if (articleStore.loadingInitial) return <LoadingComponent content = 'Loading Articles...' />

  return (
   <>
      <Container style={{marginTop: '7em'}}>
      <Button positive content='Create Article' style={{marginBottom: '1rem'}} onClick = {() => articleStore.openForm()} />
        <ArticleDashboard
        articles={articleStore.articles}
        />   
      </Container>  
   </>
  );
}

export default observer(Article);
