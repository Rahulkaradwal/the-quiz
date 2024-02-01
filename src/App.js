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
import { useQuiz } from "./context/ContextQuiz";

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        <Progress />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
