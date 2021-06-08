import React from "react";
import PropTypes from "prop-types";

export default function QuestionCount(props) {
  return (
    <div className="questionCount">
      {props.count} / {props.total}
    </div>
  );
}

QuestionCount.propTypes = {
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
