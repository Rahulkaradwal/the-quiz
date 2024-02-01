import React from "react";
import { useQuiz } from "../context/ContextQuiz";

function NextButton() {
  const { dispatch, index, totalQuestion, answer } = useQuiz();
  if (answer === null) return null;

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
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
