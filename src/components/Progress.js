import React from "react";
import { useQuiz } from "../context/ContextQuiz";

function Progress() {
  const { index, totalQuestion, points, maxPossiblePoints, answer } = useQuiz();
  return (
    <div className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={totalQuestion}
      ></progress>
      <p>
        Question {index + 1} / {totalQuestion}
      </p>
      <p>
        {points}/{maxPossiblePoints}
      </p>
    </div>
  );
}

export default Progress;
