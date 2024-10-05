import { useEffect, useState } from "react";
import "./styles/answer.css";
function Answer({
  possibleAnswer,
  correctAnswer,
  userAnswer,
  user_Selected,
  handleClickOnAnswer,
  game_status
}) {
  const [assignedClass, setAssignedClass] = useState("answer");



  useEffect(() => {
    if (user_Selected) {
      if (possibleAnswer === correctAnswer) {
        setAssignedClass("correct");
      } else {
        setAssignedClass("wrong");  
      }
    } else {
      setAssignedClass("answer"); 
    }
  }, [user_Selected, correctAnswer, possibleAnswer]);

  return (
    <div
      className={assignedClass}
      onClick={() => handleClickOnAnswer(possibleAnswer)}
      style={{ border: "solid 1px black", cursor: "pointer" }}
    >
      <li className="answer-text" style={{ listStyle: "none", marginLeft: "0" }}>{possibleAnswer}</li>
    </div>
  );
}

export default Answer;
