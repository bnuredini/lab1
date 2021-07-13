import { observer } from "mobx-react-lite";
import React from "react";
import { List } from "semantic-ui-react";
// @ts-ignore
import Avatar from "boring-avatars";
import { Profile } from "../../../app/models/profile";

interface Props {
  patients: Profile[];
}

export default observer(function VaccineListItemPatient({ patients }: Props) {
  return (
    <List horizontal>
      {patients.map((p) => (
        <List.Item style={{ padding: "00rem" }}>
          <Avatar
            size={40}
            variant="beam"
            colors={["#A7DBD8", "#E0E4CC", "#F38630", "#FA6900"]}
            // style={{ marginRight: ".5rem" }}
          />
          <p>{p.displayName}</p>
        </List.Item>
      ))}
    </List>
  );
});
