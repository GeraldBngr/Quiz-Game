import { useState, useEffect } from "react";
import QuestionBox from "./Question-Box";

function App() {
  const questionsURL =
    "https://the-trivia-api.com/v2/questions?difficulties=easy";
  const [data, setData] = useState([]);
  const [game_status, setGame_Status] = useState("prestart");
 

  useEffect(() => {
    
   
if(game_status==="prestart"||game_status==="end") {
 
    fetch(questionsURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
    
  }, [game_status]);

  return (
    <>
     {data?<QuestionBox  game_status={game_status} setGame_Status={setGame_Status} setOfQuestions={data} />:""} 
    </>
  );
}

export default App;





