import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserResult } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileResults() {
  const { profileStore } = useStore();
  const { loadUserResults, profile, loadingResults, userResults } =
    profileStore;

  useEffect(() => {
    loadUserResults(profile!.username);
  }, [loadUserResults, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserResults(profile!.username);
  };

  return (
    <Tab.Pane loading={loadingResults}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="clipboard" content={"Rezultatet"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userResults.map((results: UserResult) => (
              <Card
                as={Link}
                to={`/results/${results.id}`}
                key={results.id}
              >
                <Card.Content>
                  <Card.Header textAlign="center">{results.result}</Card.Header>
                  <Card.Meta textAlign="center">{results.testName} </Card.Meta>
                  <Card.Meta textAlign="center">{results.date} </Card.Meta>

                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
