import React, { Component } from "react";
import Quiz from "./Quiz";
import Result from "./Result";
import quizQuestions from "./quizQuestions";

class ScreeningTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      questionId: 1,
      question: "",
      options: [], // list of options for a given question
      answer: "",
      answersCount: {},
      result: "",
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    const shuffledAsnwerOptions = quizQuestions.map((q) =>
      this.shuffleArray(q.answers)
    );

    this.setState({
      question: quizQuestions[0].question,
      options: shuffledAsnwerOptions[0],
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1,
      },
      answer: answer,
    }));
  }

  setNextQuestion() {
    const count = this.state.count + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      count: count,
      questionId: questionId,
      question: quizQuestions[count].question,
      options: quizQuestions[count].answers,
      answer: "",
    });

    console.log(this.state.answersCount);
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(
      (key) => answersCount[key] === maxAnswerCount
    );
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({
        result:
          "Nuk mund te ju keshillojme me pergjigjjet e dhena. Drejtojuni nje profesionalist mjeksore me per teper informata.",
      });
    }
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        options={this.state.options}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div className="screening-test">
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default ScreeningTest;
