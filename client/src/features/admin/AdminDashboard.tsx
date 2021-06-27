import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Menu, Segment } from "semantic-ui-react";

export default class AdminDashboard extends Component {
  state = { activeItem: "privateCenters" };

  handleItemClick = (e: any, { name }: any) =>
    this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Grid columns={2}>
        <Grid.Column width="4">
          <Menu fluid vertical tabular>
            <Menu.Item
              name="Private Centers"
              active={activeItem === "Private Centers"}
              as={NavLink} to="/privateCenters"
            />
            <Menu.Item
              name="Public Centers"
              active={activeItem === "Public Centers"}
              as={NavLink} to="/publicCenters"
            />
            <Menu.Item
              name="Vaccines"
              active={activeItem === "Vaccines"}
              as={NavLink} to="/vaccines"
            />
            <Menu.Item
              name="Variations"
              active={activeItem === "Variations"}
              as={NavLink} to="/variations"
            />
             <Menu.Item
              name="Chronic Diseases"
              active={activeItem === "Chronic Disease"}
              as={NavLink} to="/chronicDiseases"
            />
            <Menu.Item
              name="Users"
              active={activeItem === "Users"}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
          explicabo itaque aperiam magni at. Laudantium ipsam ab, voluptatem
          voluptas veniam sed. Consequuntur quis non aliquam id ipsum porro
          vitae perferendis.
        </Grid.Column>
      </Grid>
    );
  }
}
