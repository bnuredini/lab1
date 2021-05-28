import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import modalStore from "../stores/modalStore";
import { useStore } from "../stores/store";
// @ts-ignore
import Avatar from "boring-avatars";

export default observer(function NavBar() {
  const { userStore, modalStore } = useStore();
  const {
    userStore: { user, logout },
  } = useStore();

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
        <Menu.Item as={NavLink} to="/stats" name="Statistikat" />
        <Menu.Item as={NavLink} to="/patients" name="Pacientet" />
        <Menu.Item as={NavLink} to="/errors" name="Errors" />
        <Menu.Item name="Profili" />
        <Menu.Item position={"right"}></Menu.Item>
        <Menu.Item position="right">
          {userStore.isLoggedIn ? (
            <>
              {/* <Image
                src={user?.image || "/assets/user.png"}
                avatar
                spaced="right"
              /> */}
              <Avatar
                size={40}
                name={user?.displayName}
                variant="beam"
                colors={["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900"]}
                style={{ marginRight: ".5rem" }}
              />
              <Dropdown pointing="top left" text={user?.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/profile/${user?.username}`}
                    text="My Profile"
                    icon="user"
                    style={{ marginRight: "2rem" }}
                  />
                  <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <div></div>
          )}
          {userStore.isLoggedIn ? (
            <div></div>
          ) : (
            <>
              <Button
                onClick={() => modalStore.openModal(<LoginForm />)}
                inverted
                style={{ margin: "0rem 1rem" }}
              >
                Kycu
              </Button>
              <Button
                onClick={() => modalStore.openModal(<RegisterForm />)}
                inverted
              >
                Registrohu
              </Button>
            </>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
});
