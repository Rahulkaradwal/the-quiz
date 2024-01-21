import React from "react";

function NextButton({ dispatch, index, totalQuestion, answer }) {
  if (answer === null) return;

  if (index < totalQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === totalQuestion - 1)
    return <button className="btn btn-ui">Finish</button>;
}

export default NextButton;
