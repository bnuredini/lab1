import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserTreatment } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileTreatments() {
  const { profileStore } = useStore();
  const { loadUserTreatments, profile, loadingTreatments, userTreatments } =
    profileStore;

  useEffect(() => {
    loadUserTreatments(profile!.username);
  }, [loadUserTreatments, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserTreatments(profile!.username);
  };

  return (
    <Tab.Pane loading={loadingTreatments}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="medkit" content={"Trajtimi"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userTreatments.map((treatment: UserTreatment) => (
              <Card as={Link} to={`/treatment/${treatment.id}`} key={treatment.id}>
                <Card.Content>
                  <Card.Header textAlign="center">{treatment.description}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{treatment.date}</div>
                    <div>{treatment.doctor}</div>
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
