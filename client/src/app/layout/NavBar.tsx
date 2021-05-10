import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
  const { testStore } = useStore();

  return (
    <Menu pointing widths={10}>
      <Container>
        <Menu.Item>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "5px" }}
          />
        </Menu.Item>
        <Menu.Item name="Tests" />
        <Menu.Item name="Statistics" />
        <Menu.Item name="Profile" />
        <Menu.Item>
          <Button
            onClick={() => testStore.openForm()}
            primary
            content="Create a Test"
          />
        </Menu.Item>
        <Menu.Item position={"right"}>
          <Button content="Login" />
        </Menu.Item>
        <Menu.Item>
          <Button content="Register" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
