import StartQuizButton from "./StartQuizButton";

import Modal from "react-modal";
Modal.setAppElement("#root");
function DialogModal({
  isOpen,
  onRequestClose,
  points,
  game_status,
  setGame_Status,
  setUserSelected

})
 {
  
  
  return (
    <Modal
    
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Points Modal"
    >
      <>
        <h1>You scored {points}!</h1>
        <h2>You wanna play again?</h2>
        <StartQuizButton
         setUserSelected={setUserSelected}
        onClick={onRequestClose}
          game_status={game_status}
          button_text={"Yeah lets play again"}
          setGame_Status={setGame_Status}
        />
        <button onClick={onRequestClose}>Nah am good!</button>
      </>
    </Modal>
  );
}
export default DialogModal;
