import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
  return (
    <Segment>
      <Header>
        <Icon name="search" />
        Ktu s'ka gje
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/">
          Ktheu ne shtepi
        </Button>
      </Segment.Inline>
    </Segment>
  );
}
