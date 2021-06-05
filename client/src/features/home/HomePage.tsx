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
import Footer from "./Footer";
// import Footer from "./Footer";

export default function HomePage() {
  return (
    <div style={{ margin: "0" }}>
      <Container style={{ marginTop: "7em" }}>
        <div className="main-bg"></div>
        <Image centered src="/assets/logo.png" />
        <h1 className="title" style={{ textAlign: "center" }}>
          shneta
        </h1>

        {/* Services w/ small icons */}
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

        {/* Tests */}
        <div className="tests-wrapper">
          <Grid columns={2} className="tests">
            <Grid.Column width={6}>
              <Image centered src="/assets/tests.png" width="100" />
            </Grid.Column>
            <Grid.Column>
              <Header as="h2" content="Teste"></Header>
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
                magnam debitis corrupti ea hic, modi reprehenderit atque, rerum
                aspernatur quam aperiam unde ipsum nisi blanditiis sunt facilis
                eligendi ut saepe quaerat inventore. Assumenda itaque aliquid
                aliquam natus et aperiam placeat nemo atque cumque hic esse
                incidunt iure nulla doloremque, officia ad omnis nisi
                perspiciatis quis eius possimus ea provident. At, rerum! Eveniet
                hic sequi tempora fuga facilis exercitationem cum officiis!
              </div>
            </Grid.Column>
          </Grid>
        </div>

        {/* Stats */}
        <div className="stats-wrapper">
          <Grid columns={2} className="stats">
            <Grid.Column>
              <Header as="h2" content="Statistika"></Header>
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
                magnam debitis corrupti ea hic, modi reprehenderit atque, rerum
                aspernatur quam aperiam unde ipsum nisi blanditiis sunt facilis
                eligendi ut saepe quaerat inventore. Assumenda itaque aliquid
                aliquam natus et aperiam placeat nemo atque cumque hic esse
                incidunt iure nulla doloremque, officia ad omnis nisi
                perspiciatis quis eius possimus ea provident. At, rerum! Eveniet
                hic sequi tempora fuga facilis exercitationem cum officiis!
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <Image centered src="/assets/stats.png" width="100" />
            </Grid.Column>
          </Grid>
        </div>

        {/* Management */}
        <div className="management-wrapper">
          <Grid columns={2} className="management">
            <Grid.Column width={6}>
              <Image centered src="/assets/patients.png" width="100" />
            </Grid.Column>
            <Grid.Column>
              <Header as="h2" content="Menaxhimi i pacienteve"></Header>
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
                magnam debitis corrupti ea hic, modi reprehenderit atque, rerum
                aspernatur quam aperiam unde ipsum nisi blanditiis sunt facilis
                eligendi ut saepe quaerat inventore. Assumenda itaque aliquid
                aliquam natus et aperiam placeat nemo atque cumque hic esse
                incidunt iure nulla doloremque, officia ad omnis nisi
                perspiciatis quis eius possimus ea provident. At, rerum! Eveniet
                hic sequi tempora fuga facilis exercitationem cum officiis!
              </div>
            </Grid.Column>
          </Grid>
        </div>

        {/* Help */}
        <div className="help-wrapper">
          <Grid columns={2} className="help">
            <Grid.Column>
              <Header as="h2" content="Udhezime"></Header>
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
                magnam debitis corrupti ea hic, modi reprehenderit atque, rerum
                aspernatur quam aperiam unde ipsum nisi blanditiis sunt facilis
                eligendi ut saepe quaerat inventore. Assumenda itaque aliquid
                aliquam natus et aperiam placeat nemo atque cumque hic esse
                incidunt iure nulla doloremque, officia ad omnis nisi
                perspiciatis quis eius possimus ea provident. At, rerum! Eveniet
                hic sequi tempora fuga facilis exercitationem cum officiis!
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <Image centered src="/assets/help.png" width="100" />
            </Grid.Column>
          </Grid>
        </div>

        <Embed id="zBkVCpbNnkU" source="youtube" aspectRatio="16:9" />

        <Footer />
      </Container>
    </div>
  );
}
