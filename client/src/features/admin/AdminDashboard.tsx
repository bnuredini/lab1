import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Card, Grid, Header, Menu, Segment } from "semantic-ui-react";

export default class AdminDashboard extends Component {
  state = { activeItem: "privateCenters" };

  handleItemClick = (e: any, { name }: any) =>
    this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <>
        <Segment>
          <Header size="huge">Paneli i Adminit</Header>
        </Segment>
        <Segment>
          <Card.Group itemsPerRow={4}>
            <Card as={Link} to={"/chronicDiseases/"}>
              <Card.Content>
                <Card.Header textAlign="center">Semundjet Kronike</Card.Header>
              </Card.Content>
            </Card>
            <Card as={Link} to={"/privateCenters"}>
              <Card.Content>
                <Card.Header textAlign="center">Qendrat Private</Card.Header>
              </Card.Content>
            </Card>
            <Card as={Link} to={"/publicCenters"}>
              <Card.Content>
                <Card.Header textAlign="center">Qendrat Publike</Card.Header>
              </Card.Content>
            </Card>
            <Card as={Link} to={"/vaccines"}>
              <Card.Content>
                <Card.Header textAlign="center">Vaksinat</Card.Header>
              </Card.Content>
            </Card>
            <Card as={Link} to={"/variations"}>
              <Card.Content>
                <Card.Header textAlign="center">Variacionet</Card.Header>
              </Card.Content>
            </Card>
            <Card as={Link} to={"/chronicDiseases"}>
              <Card.Content>
                <Card.Header textAlign="center">Semundjet Kronike</Card.Header>
              </Card.Content>
            </Card>
            <Card as={Link} to={"/allergies"}>
              <Card.Content>
                <Card.Header textAlign="center">Alergjite</Card.Header>
              </Card.Content>
            </Card>
            <Card as={Link} to={"/restrictions"}>
              <Card.Content>
                <Card.Header textAlign="center">Kufizimet</Card.Header>
              </Card.Content>
            </Card>
            <Card as={Link} to={"/doctors"}>
              <Card.Content>
                <Card.Header textAlign="center">Doktoret</Card.Header>
              </Card.Content>
            </Card>
            <Card as={Link} to={"/locations"}>
              <Card.Content>
                <Card.Header textAlign="center">Lokacionet</Card.Header>
              </Card.Content>
            </Card>
          </Card.Group>
        </Segment>
      </>
    );
  }
}
