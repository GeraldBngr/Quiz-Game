import { useState, useEffect } from "react";
import QuestionBox from "./Question-Box";

function App() {
  const questionsURL =
    "https://the-trivia-api.com/v2/questions?difficulties=easy";
  const [data, setData] = useState([]);


  useEffect(() => {
   

    fetch(questionsURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
     {data?<QuestionBox setOfQuestions={data} />:""} 
    </>
  );
}

export default App;
