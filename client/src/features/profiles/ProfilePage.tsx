import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Header, Item, Segment, Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfileContent from './ProfileContent';

export default observer(function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { userStore, modalStore } = useStore();
    const {
      userStore: { user, logout },
    } = useStore();

    return (
        <Grid>
            <Item>
                <Item.Content verticalAlign='middle'>
                    <Header id="patientusername" as='h1' content={user?.displayName}/>
                </Item.Content>
            </Item>
            <Grid.Column width={16}>    
                        <ProfileContent/>
            </Grid.Column>
        </Grid>
    )
}) 