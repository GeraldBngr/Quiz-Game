import { useEffect, useState } from "react";
// import Answer from "./Answer";

function QuestionBox() {
  const questionsURL = "https://the-trivia-api.com/v2/questions?difficulties=easy";
  const [data, setData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [possibleAnswers, setPossibleAnswers] = useState([]);

  useEffect(() => {
    fetch(questionsURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data, "fetched");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const lastQuestion = data[data.length - 1];
      setCurrentQuestion(lastQuestion);
      console.log(lastQuestion);
    }
  }, [data]);

  return (
    <>
      <ul>
        {/* <Answer />
        <Answer />
        <Answer />
        <Answer /> */}
      </ul>
    </>
  );
}

export default QuestionBox;
