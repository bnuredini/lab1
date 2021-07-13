import React, { SyntheticEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserVaccine } from '../../app/models/profile';
import { useStore } from "../../app/stores/store";


export default observer(function ProfileVaccines() {
    const { profileStore } = useStore();
    const {
        loadUserVaccines,
        profile,
        loadingVaccines,
        userVaccines
    } = profileStore;

    useEffect(() => {
        loadUserVaccines(profile!.username);
    }, [loadUserVaccines, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadUserVaccines(profile!.username);
    };

    return (
        <Tab.Pane loading={loadingVaccines}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='clipboard outline' content={'Vaksinat'} />
                </Grid.Column>
                <Grid.Column width={16}>
                <Tab
                        menu={{ secondary: true, pointing: true }}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userVaccines.map((vaccines: UserVaccine) => (
                            <Card
                                as={Link}
                                to={`/vaccines/${vaccines.id}`}
                                key={vaccines.id}
                            >
                                
                                <Card.Content>
                                    <Card.Header textAlign='center'>{vaccines.name}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{vaccines.efficacy}</div>
                                        <div>{vaccines.creator}</div>
                                        <div>{vaccines.type}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});