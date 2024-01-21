import React from "react";

function Progress({ index, totalQuestion, points, maxPossiblePoints, answer }) {
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
