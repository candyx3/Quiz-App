import { useState } from "react";
import questions from "./questions.json";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  function nextQuestion() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      let total = 0;

      questions.forEach((question, i) => {
        if (answers[i] === question.answer) {
          total++;
        }
      });

      setFinished(true);
    }
  }

  function previousQuestion() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function selectAnswer(option) {
    setAnswers({ ...answers, [index]: option });
  }

  function restartQuiz() {
    setName("");
    setStarted(false);
    setIndex(0);
    setAnswers({});
    setFinished(false);
  }

  let score = 0;

  questions.forEach((question, i) => {
    if (answers[i] === question.answer) {
      score++;
    }
  });

  return (
    <div className="container">
      {!started && (
        <>
          <h1>React Quiz</h1>
          <h2>Enter Your Name</h2>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="next"
            onClick={() => {
              if (name.trim() !== "") {
                setStarted(true);
              }
            }}
          >
            Start Quiz
          </button>
        </>
      )}

      {started && !finished && (
        <>
          <h1>Hello, {name}!</h1>
          <p>Question {index + 1} of {questions.length}</p>
          <h2>{questions[index].question}</h2>

          {questions[index].options.map((option) => (
            <button
              key={option}
              className={
                answers[index] === option ? "selected" : "option"
              }
              onClick={() => selectAnswer(option)}
            >
              {option}
            </button>
          ))}

          <div className="navigation">
            <button
              className="previous"
              onClick={previousQuestion}
              disabled={index === 0}
            >
              Previous
            </button>

            <button
              className="next"
              onClick={nextQuestion}
              disabled={!answers[index]}
            >
              {index === questions.length - 1 ? "Finish Quiz" : "Next"}
            </button>
          </div>
        </>
      )}

      {finished && (
        <>
          <h1>Quiz Completed!</h1>
          <h2>Well done, {name}!</h2>
          <h3>Your Score: {score} / {questions.length}</h3>
          <button className="next" onClick={restartQuiz}>
            Play Again
          </button>
        </>
      )}
    </div>
  );
}

export default App;