import React from "react";
import PropTypes from "prop-types";
import { Menu, Segment, Icon } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";

export default function Result(props) {
  return (
    <div className="result">
      <div className="result__title">{props.quizResult}</div>
      <br></br>
      <div className="result__items">
        <Segment>
          <Icon name="paste" />
          <Menu.Item
            as={NavLink}
            to="/tests"
            name="Krijo nje test per ta dokumentuar testimin tuaj"
            exact
          />
        </Segment>
        <Segment>
          <Icon name="home" />
          <Menu.Item as={NavLink} to="/" name="Kthehu te ballina" exact />
        </Segment>
      </div>
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired,
};
