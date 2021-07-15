import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {  UserVaccineApplication } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileApplications() {
  const { profileStore } = useStore();
  const { loadUserVaccineApplications, profile, loadingVaccineApplications, userVaccineApplications } =
    profileStore;

  useEffect(() => {
    loadUserVaccineApplications(profile!.username);
  }, [loadUserVaccineApplications, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserVaccineApplications(profile!.username);
  };

  return (
    <Tab.Pane loading={loadingVaccineApplications}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="clipboard list" content={"Aplikimet per vaksine"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userVaccineApplications.map((vaccineApplications: UserVaccineApplication) => (
              <Card as={Link} to={`/vaccineapplications/${vaccineApplications.id}`} key={vaccineApplications.id}>
                <Card.Content>
                  <Card.Header textAlign="center">{vaccineApplications.type}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{vaccineApplications.date}</div>
                    <div>{vaccineApplications.email}</div>
                    <div>{vaccineApplications.location}</div>
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
