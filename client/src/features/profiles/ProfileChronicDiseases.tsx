import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserAllergy, UserChronicDisease } from "../../app/models/profile";
import { format } from "date-fns";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileChronicDiseases() {
  const { profileStore } = useStore();
  const {
    loadUserChronicDiseases,
    profile,
    loadingChronicDiseases,
    userChronicDiseases,
  } = profileStore;

  useEffect(() => {
    loadUserChronicDiseases(profile!.username);
  }, [loadUserChronicDiseases, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserChronicDiseases(profile!.username);
  };

  return (
    <Tab.Pane loading={loadingChronicDiseases}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="stethoscope"
            content={"Semundjet Kronike"}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />

          <Card.Group itemsPerRow={4}>
            {userChronicDiseases.map((chronicDiseases: UserChronicDisease) => (
              <Card
                as={Link}
                to={`/chronicDiseases/${chronicDiseases.id}`}
                key={chronicDiseases.id}
              >
                <Card.Content>
                  <Card.Header textAlign="center">
                    {chronicDiseases.name}
                  </Card.Header>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
