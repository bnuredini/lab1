import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "./RegisterForm";
// import RegisterForm from '../users/RegisterForm';

export default observer(function LoginPage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          shenta
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header
              as="h2"
              inverted
              content="Miresevini ne faqen e pare shqip per aplikimin per test te COVID-19"
            />
            <Button as={Link} to="/" size="huge" inverted>
              Shiko faqen kryesore!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Registrohu
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});
