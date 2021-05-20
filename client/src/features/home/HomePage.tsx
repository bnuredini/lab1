import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Container style={{ marginTop: "7em" }}>
      <Image centered src="/assets/logo.png" />
      <h1 style={{ textAlign: "center" }}>shneta</h1>

      <Grid columns={4} style={{ marginTop: "5rem" }}>
        <Grid.Column>
          <Image centered src="/assets/tests.png" width="100" />
          <h3 style={{ textAlign: "center" }}>Teste</h3>
          <div style={{ textAlign: "center" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quis.
          </div>
        </Grid.Column>
        <Grid.Column>
          <Image centered src="/assets/stats.png" width="100" />
          <h3 style={{ textAlign: "center" }}>Statistika</h3>
          <div style={{ textAlign: "center" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quis.
          </div>
        </Grid.Column>
        <Grid.Column>
          <Image centered src="/assets/patients.png" width="100" />
          <h3 style={{ textAlign: "center" }}>Menaxhim pacientesh</h3>
          <div style={{ textAlign: "center" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quis.
          </div>
        </Grid.Column>
        <Grid.Column>
          <Image centered src="/assets/help.png" width="100" />
          <h3 style={{ textAlign: "center" }}>Udhzime</h3>
          <div style={{ textAlign: "center" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quis.
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
