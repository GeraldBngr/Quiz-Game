function StartQuizButton({setGame_Status,button_text,game_status,setUserSelected}) {


   
    function setGameToStart() {
        setUserSelected(false);
        if (game_status==="prestart" || game_status==="end") {
            
             setGame_Status("action")
           
        }
       
        
    }

    return(
        <>
        <button  onClick={setGameToStart}>{button_text}</button>
        </>
    )
    
}

export default StartQuizButton