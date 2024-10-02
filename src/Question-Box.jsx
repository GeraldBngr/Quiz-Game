import { useEffect, useRef, useState } from "react";
import Answer from "./Answer.jsx";
import StartQuizButton from "./StartQuizButton.jsx";
import DialogModal from "./PointCardModal.jsx";
function QuestionBox({ setOfQuestions, game_status, setGame_Status }) {
  const user_Points = useRef(0);
 

  const [currentQuestion, setCurrentQuestion] = useState({});
  const [possibleAnswers, setPossibleAnswers] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false); // Controls the modal open/close state

  function handleOpenModal() {
    setModalIsOpen(true);
    console.log("modal opened");
  }
  function handleCloseModal() {
    setModalIsOpen(false);
    console.log("modal closed");
    
  }

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
    console.log(user_Points.current);
    

    if (setOfQuestions.length > 0) {
      if (setOfQuestions.length === 1) {
        setGame_Status("end");
        handleOpenModal();
      }
      setOfQuestions.pop();
      const lastQuestion = setOfQuestions[setOfQuestions.length - 1];
      setCurrentQuestion({ ...lastQuestion });
    } else {
      setGame_Status("end");
      handleOpenModal();
    }
  }

  return (
    <>
      {game_status === "prestart" ? (
        <>
          <h1>Wanna do a quiz?</h1>
          <StartQuizButton
            game_status={game_status}
            button_text={"Start Game"}
            setGame_Status={setGame_Status}
            
          />{" "}
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
          />
          {/* <h1>Another quiz?</h1>
          <StartQuizButton
            game_status={game_status}
            button_text={"Start another quiz"}
            setGame_Status={setGame_Status}
          /> */}
        </>
      ) : (
        ""
      )}

      <div>
        {game_status === "action" && setOfQuestions.length > 0 ? (
          <>
            <h1>{currentQuestion.question.text}</h1>
            <ul onClick={handleClickOnAnswer} style={{ paddingLeft: "0" }}>
              {game_status === "action"
                ? possibleAnswers.map((possibleAnswer, index) => (
                    <Answer
                      setCurrentQuestion={setCurrentQuestion}
                      correctAnswer={currentQuestion.correctAnswer}
                      key={index}
                      possibleAnswer={possibleAnswer}
                    />
                  ))
                : ""}
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
