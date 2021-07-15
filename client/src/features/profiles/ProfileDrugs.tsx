import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserDrug } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileDrugs() {
  const { profileStore } = useStore();
  const { loadUserDrugs, profile, loadingDrugs, userDrugs } =
    profileStore;

  useEffect(() => {
    loadUserDrugs(profile!.username);
  }, [loadUserDrugs, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserDrugs(profile!.username);
  };

  return (
    <Tab.Pane loading={loadingDrugs}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="pills" content={"Ilaqet"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userDrugs.map((drugs: UserDrug) => (
              <Card as={Link} to={`/drugs/${drugs.id}`} key={drugs.id}>
                <Card.Content>
                  <Card.Header textAlign="center">{drugs.name}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{drugs.sideEffects}</div>
                    <div>{drugs.description}</div>
                    <div>{drugs.type}</div>
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
