import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";

import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Loader from "./components/Loader";
import Error from "./components/Error";
import FinishScreen from "./FinishScreen";
import Footer from "./components/Footer";
import Progress from "./components/Progress";
import Timer from "./components/Timer";
import { QuizProvider, useQuiz } from "./context/ContextQuiz";

function App() {
  const { status, questions, index } = useQuiz();
  return (
    <div className="app">
      <QuizProvider>
        <Header />
        <Main>
          <Progress />
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && <StartScreen />}
          {status === "active" && (
            <>
              <Question question={questions[index]} />
              <Footer>
                <Timer />
                <NextButton />
              </Footer>
            </>
          )}

          {status === "finished" && <FinishScreen />}
        </Main>
      </QuizProvider>
    </div>
  );
}

export default App;
