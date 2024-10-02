import StartQuizButton from "./StartQuizButton";

import Modal from "react-modal";
Modal.setAppElement("#root");
function DialogModal({ isOpen, onRequestClose, points,game_status,setGame_Status }) {
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Points Modal"
    >
      <>
        <h1>You scored {points}!</h1>
        <h2>You wanna play again?</h2>
    <StartQuizButton  game_status={game_status}
            button_text={"Yeah lets play again"}
            setGame_Status={setGame_Status} />
          
      </>
    </Modal>
  );
}
export default DialogModal;
