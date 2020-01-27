import React, { Component } from 'react';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./assets/style.scss";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result.js";

class Quiz extends Component {

  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };

  getQuestions =  () =>  {
    quizService().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };

  computeAnswer = (answer, correctAnswer) => {
    if(answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
    }
    
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });
  }

  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    });
  }

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-8 quiz-box shadow">
            <div className="row">
              <div className="col-md-12 title-container">
                <h1 className="title">Quiz Game</h1>
              </div>
            </div>
            {this.state.questionBank.length > 0 &&
              this.state.responses < 5 &&
              this.state.questionBank.map(
                ({question, answers, correct, questionId}) => (
                  <QuestionBox
                    question={question}
                    options={answers}
                    key={questionId}
                    selected={answer => this.computeAnswer(answer, correct)}
                  />
                )
              )}

              {this.state.responses === 5 ? (
                <Result score={this.state.score} playAgain={this.playAgain} />
              ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Quiz />, document.getElementById('root'));
