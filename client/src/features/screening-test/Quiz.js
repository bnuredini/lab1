import React from "react";
import PropTypes from "prop-types";
import Question from "./Question";
import QuestionCount from "./QuestionCount";
import AnswerOption from "./AnswerOption";

export default function Quiz(props) {
  // return <div>shanari</div>;

  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    <div key={props.questionId}>
      <QuestionCount count={props.questionId} total={props.questionTotal} />
      <Question content={props.question} />
      <ul className="options">{props.options.map(renderAnswerOptions)}</ul>
    </div>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
};
