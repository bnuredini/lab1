import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function RoleList() {
  const { roleStore } = useStore();
  const { deleteRole, roles, loading } = roleStore;
  const [target, setTarget] = useState("");

  function handleRoleDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteRole(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {roles.map((role) => {
          return (
            <Item key={role.id}>
              <Item.Content>
                <Item.Header as="a">{role.roleName}</Item.Header>
                <Item.Description>
                  <div>{role.responsibility}</div>
                  <div>
                    {role.isAdmin}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => roleStore.selectRole(role.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={role.id}
                    loading={loading && target === role.id}
                    onClick={(e) => handleRoleDelete(e, role.id)}
                    floated="right"
                    content="Fshij"
                    color="red"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
});