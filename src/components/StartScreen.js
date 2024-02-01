import React from "react";
import { useQuiz } from "../context/ContextQuiz";

function StartScreen() {
  const { totalQuestion, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{totalQuestion} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
