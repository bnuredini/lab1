import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Item, Segment, } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
// @ts-ignore
import Avatar from "boring-avatars";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Avatar
                size={200}
                variant="beam"
                name={profile.displayName}
                colors={["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900"]}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  );
});
