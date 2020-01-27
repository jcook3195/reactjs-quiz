import React from "react";

const Result = ({score, playAgain}) => (
  <div className="score-board">
    <h2 className="score">You scored {score} / 5 correct answers!</h2>
    <button className="btn btn-primary" onClick={playAgain}>Play Again</button>
  </div>
);

export default Result;
