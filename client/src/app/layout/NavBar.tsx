import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const{userStore: {user, logout}}=useStore();
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
        <Menu.Item as={NavLink} to="/errors" name="Errors" />
        <Menu.Item name="Profili" />
        <Menu.Item position={"right"}>
          
</Menu.Item>
<Menu.Item position='right'>
          <Image src={user?.image || '/assets/user.png'}avatar spaced= 'right'/>
          <Dropdown pointing='top left' text={user?.displayName}>
            <Dropdown.Menu>
            <Dropdown.Item as ={Link}to={`/profile/${user?.username}`} text='My Profile' icon='user' />
            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
            </Dropdown.Menu>  
          </Dropdown>
         


          {/* <Menu.Item>
          <Button content="Regjistrohu" />
          </Menu.Item> */}
           
         </Menu.Item>
      </Container>
    </Menu>
  );
})
