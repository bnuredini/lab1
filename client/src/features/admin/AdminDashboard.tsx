import React, { Component } from "react";
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
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Public Centers"
              active={activeItem === "Public Centers"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Vaccines"
              active={activeItem === "Vaccines"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Variations"
              active={activeItem === "Variations"}
              onClick={this.handleItemClick}
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