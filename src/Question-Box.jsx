import { useEffect, useRef, useState } from "react";
import Answer from "./Answer.jsx";
function QuestionBox({ setOfQuestions }) {
  const user_Points = useRef(0);

  const [currentQuestion, setCurrentQuestion] = useState({});
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [game_status, setGame_Status] = useState(true);

  useEffect(() => {
    if (setOfQuestions.length > 0) {
      const lastQuestion = setOfQuestions[setOfQuestions.length - 1];
      setCurrentQuestion(lastQuestion);
    }
  }, [setOfQuestions]);

  useEffect(() => {
    if (currentQuestion.question) {
      const answers = [
        ...currentQuestion.incorrectAnswers,
        currentQuestion.correctAnswer,
      ];
      let answers_to_random_order = [];
      while (answers.length > 0) {
        let random_number = Math.floor(Math.random() * answers.length);
        answers_to_random_order.push(answers.splice(random_number, 1)[0]);
      }

      setPossibleAnswers(answers_to_random_order);
    }
  }, [currentQuestion]);

  function handleClickOnAnswer(event) {
    let user_Answer = event.target.innerText;
    if (user_Answer === currentQuestion.correctAnswer) {
      user_Points.current += 5;
    } else {
      if (user_Points.current > 0) {
        user_Points.current -= 5;
      } else {
        user_Points.current = 0;
      }
    }

    if (setOfQuestions.length > 0) {
      if(setOfQuestions.length===1) {
        setGame_Status(false)
      }
      setOfQuestions.pop();
      const lastQuestion = setOfQuestions[setOfQuestions.length - 1];
      setCurrentQuestion({ ...lastQuestion });
    } else {
      
      setGame_Status(false);
    }
  }

  return (
    <>
      <div>
  {currentQuestion.question && game_status ? (
    <h1>{currentQuestion.question.text}</h1>
  ) : !currentQuestion.question && !game_status ? (
    <h1>Game Over</h1>
  ) : (
    <h1>Loading</h1>
  )}
</div>

      <ul onClick={handleClickOnAnswer} style={{ paddingLeft: "0" }}>


        {game_status ? (
          possibleAnswers.map((possibleAnswer, index) => (
            <Answer
              setCurrentQuestion={setCurrentQuestion}
              correctAnswer={currentQuestion.correctAnswer}
              key={index}
              possibleAnswer={possibleAnswer}
            />
          ))
        ) : (
          <p>End of game</p>
        )}
      </ul>
      {!game_status}
    </>
  );
}

export default QuestionBox;
