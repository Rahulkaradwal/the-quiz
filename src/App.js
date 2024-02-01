import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";

import { useEffect, useReducer } from "react";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Loader from "./components/Loader";
import Error from "./components/Error";
import FinishScreen from "./FinishScreen";
import Footer from "./components/Footer";
import Progress from "./components/Progress";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="app">
      <Header />
      <Main>
        <Progress
          totalQuestion={totalQuestion}
          index={index}
          answer={answer}
          points={points}
          maxPossiblePoints={maxPossiblePoints}
        />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen totalQuestion={totalQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondRemaining={secondRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                index={index}
                totalQuestion={totalQuestion}
                answer={answer}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
