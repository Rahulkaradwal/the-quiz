import "./index.css";
import Header from "./components/Header";
import { useEffect, useReducer } from "react";

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
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialData);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => {
        return res.json();
      })
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
    </div>
  );
}

export default App;
