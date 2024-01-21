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

const initialData = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null,
  // loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      // const question = state.question.at(state.index);
      return {
        ...state,
        answer: action.payload,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    default:
      throw new Error();
  }
}

function App() {
  const [
    { questions, index, answer, points, highscore, secondRemaining, status },
    dispatch,
  ] = useReducer(reducer, initialData);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => {
        return res.json();
      })
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  // questions count
  const totalQuestion = questions.length;
  const maxPossiblePoints = questions.reduce((cur, acc) => cur + acc.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
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
