import { useEffect, useRef, useState } from "react";
import Answer from "./Answer.jsx";
import StartQuizButton from "./StartQuizButton.jsx";
import DialogModal from "./PointCardModal.jsx";

function QuestionBox({ setOfQuestions, game_status, setGame_Status }) {
  const user_Points = useRef(0);
  const [user_Selected, setUserSelected] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); // 

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  // Set the initial question
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

 
  function handleClickOnAnswer(selectedAnswer) {
    setUserAnswer(selectedAnswer);
    setUserSelected(true);

    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      user_Points.current += 5;
    } else {
      if (user_Points.current > 0) {
        user_Points.current -= 5;
      }
    }

   
    setTimeout(() => {
      if (setOfQuestions.length > 0) {
        if (setOfQuestions.length === 1) {
          setGame_Status("end");
          handleOpenModal();
        } else {
          setOfQuestions.pop();
          const lastQuestion = setOfQuestions[setOfQuestions.length - 1];
          setCurrentQuestion(lastQuestion);
          setUserSelected(false); 
          setUserAnswer(null); 
        }
      } 
    }, 500); 
  }

  return (
    <>
      {game_status === "prestart" ? (
        <>
          <h1 className="question-text">Wanna do a quiz?</h1>
          <StartQuizButton
            game_status={game_status}
            button_text={"Start Game"}
            setGame_Status={setGame_Status}
            setUserSelected={setUserSelected}
          />
        </>
      ) : (
        ""
      )}

      {game_status === "end" ? (
        <>
          <DialogModal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            points={user_Points.current}
            game_status={game_status}
            setGame_Status={setGame_Status}
            user_Points={user_Points.current}
            setUserSelected={setUserSelected}
          />
        </>
      ) : (
        ""
      )}

      <div className="quiz-container">
        {game_status === "action" && setOfQuestions.length > 0 ? (
          <>
            <h1 className="question-text">{currentQuestion.question.text}</h1>
            <ul className="answers-container" style={{ paddingLeft: "0" }}>
              {possibleAnswers.map((possibleAnswer, index) => (
                <Answer
                  key={index}
                  possibleAnswer={possibleAnswer}
                  correctAnswer={currentQuestion.correctAnswer}
                  userAnswer={userAnswer}
                  user_Selected={user_Selected}
                  handleClickOnAnswer={handleClickOnAnswer}
                  game_status={game_status}
                />
              ))}
            </ul>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default QuestionBox;
