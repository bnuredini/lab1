import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
  const { testStore } = useStore();

  return (
    <Menu pointing widths={10}>
      <Container>
        <Menu.Item as={NavLink} to="/" exact>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "5px" }}
          />
        </Menu.Item>
        <Menu.Item as={NavLink} to="/tests" name="Testet" exact />
        <Menu.Item as={NavLink} to="/countries" name="Statistikat" />
        <Menu.Item as={NavLink} to="/patients" name="Pacientet" />
        <Menu.Item name="Profili" />
        <Menu.Item position={"right"}>
          <Button content="Kycu" />
        </Menu.Item>
        <Menu.Item>
          <Button content="Regjistrohu" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
