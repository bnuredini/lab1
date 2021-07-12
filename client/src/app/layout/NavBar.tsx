import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Dropdown } from "semantic-ui-react";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
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
        <Menu.Item
          as={NavLink}
          to="/screening-test"
          name="Testi online"
          className="navitem"
        />
        <Menu.Item
          as={NavLink}
          to="/stats"
          name="Statistikat"
          className="navitem"
        />
        <Menu.Item
          as={NavLink}
          to="/articles"
          name="Artikujt"
          className="navitem"
        />
        <Menu.Item
          as={NavLink}
          to="/applications"
          name="Apliko"
          className="navitem"
        />
        {userStore.isLoggedIn ? (
          <>
            <Menu.Item
              as={NavLink}
              to="/tests"
              name="Testet"
              exact
              className="navitem"
            />
            {/* <Menu.Item name="Profili" className="navitem" /> */}
            {userStore.user?.role == "Admin" ? (
              <Menu.Item
                as={NavLink}
                to="/admin"
                name="Dashboard"
                className="navitem"
              />
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <div></div>
        )}
        <Menu.Item position="right" className="navitem">
          {userStore.user?.role}
        </Menu.Item>
        <Menu.Item position="right" className="navitem">
          {userStore.isLoggedIn ? (
            <>
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
                    to={`/profiles/${user?.username}`}
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
                Regjistrohu
              </Button>
            </>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
});
