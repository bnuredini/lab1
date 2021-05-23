import React from "react";
import {
  Container,
  Divider,
  Embed,
  Grid,
  Header,
  Image,
  List,
  Segment,
} from "semantic-ui-react";

export default function HomePage() {
  return (
    <div>
      <Container style={{ marginTop: "7em" }}>
        <Image centered src="/assets/logo.png" />
        <h1 style={{ textAlign: "center" }}>shneta</h1>

        <Grid columns={4} style={{ margin: "5rem 0rem" }}>
          <Grid.Column>
            <Image centered src="/assets/tests.png" width="100" />
            <h3 style={{ textAlign: "center" }}>Teste</h3>
            <div style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              quis.
            </div>
          </Grid.Column>
          <Grid.Column>
            <Image centered src="/assets/stats.png" width="100" />
            <h3 style={{ textAlign: "center" }}>Statistika</h3>
            <div style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              quis.
            </div>
          </Grid.Column>
          <Grid.Column>
            <Image centered src="/assets/patients.png" width="100" />
            <h3 style={{ textAlign: "center" }}>Menaxhim pacientesh</h3>
            <div style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              quis.
            </div>
          </Grid.Column>
          <Grid.Column>
            <Image centered src="/assets/help.png" width="100" />
            <h3 style={{ textAlign: "center" }}>Udhzime</h3>
            <div style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              quis.
            </div>
          </Grid.Column>
        </Grid>

        <Embed id="zBkVCpbNnkU" source="youtube" />
      </Container>

      <Segment
        inverted
        vertical
        style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
      >
        <Container textAlign="center">
          <Grid divided inverted stackable>
            <Grid.Column width={10}>
              <Header inverted as="h4" content="shenta" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                aspernatur architecto laudantium quidem ab doloremque natus
                nostrum cumque accusantium fuga.
              </p>
            </Grid.Column>

            <Grid.Column width={6}>
              {/* <Header inverted as="h4" content="Group 1" /> */}
              <List link inverted>
                <List.Item as="a">Testet</List.Item>
                <List.Item as="a">Statistikat</List.Item>
                <List.Item as="a">Pacientet</List.Item>
                <List.Item as="a">Profili</List.Item>
              </List>
            </Grid.Column>
          </Grid>

          <Divider inverted section />
          <Image centered size="mini" src="/assets/logo.png" />
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
}
