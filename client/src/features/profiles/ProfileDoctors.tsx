import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserDoctor } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileDoctors() {
  const { profileStore } = useStore();
  const { loadUserDoctors, profile, loadingDoctors, userDoctors } =
    profileStore;

  useEffect(() => {
    loadUserDoctors(profile!.username);
  }, [loadUserDoctors, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserDoctors(profile!.username);
  };

  return (
    <Tab.Pane loading={loadingDoctors}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user md" content={"Doktoret"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userDoctors.map((doctors: UserDoctor) => (
              <Card as={Link} to={`/doctors/${doctors.id}`} key={doctors.id}>
                <Card.Content>
                  <Card.Header textAlign="center">{doctors.type}</Card.Header>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
