import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";

import { useEffect, useReducer } from "react";
import StartScreen from "./components/StartScreen";

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

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "ready" && (
          <StartScreen totalQuestion={totalQuestion} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
