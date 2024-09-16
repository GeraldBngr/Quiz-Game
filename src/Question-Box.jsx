import { useEffect, useState } from "react"

function QuestionBox() {
    const [data,setData]=useState("");
    
    useEffect(()=>{ 
fetch("https://opentdb.com/api.php?amount=10")
.then((response)=>{return response.json().then((data)=>setData(data))
    },[])



    return (

<> <p>{data}</p></>

    )
}

export default QuestionBox