import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserAllergy } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileAllergies() {
  const { profileStore } = useStore();
  const { loadUserAllergies, profile, loadingAllergies, userAllergies } =
    profileStore;

  useEffect(() => {
    loadUserAllergies(profile!.username);
  }, [loadUserAllergies, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserAllergies(profile!.username);
  };

  return (
    <Tab.Pane loading={loadingAllergies}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="plus square outline" content={"Alergjite"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userAllergies.map((allergies: UserAllergy) => (
              <Card
                as={Link}
                to={`/allergies/${allergies.id}`}
                key={allergies.id}
              >
                <Card.Content>
                  <Card.Header textAlign="center">{allergies.type}</Card.Header>
                  <Card.Meta textAlign="center">{allergies.causes} </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
