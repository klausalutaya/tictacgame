import React, { useState, useEffect } from "react";
import "./tictac.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; 



const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [gameHistory, setGameHistory] = useState([]);

  const handleStartGameClick = () => {
    setShowModal(true);
  };


  const handleStartButtonClick = () => {
    if (player1Name && player2Name) {
      window.location.href = `/game?player1=${player1Name}&player2=${player2Name}`;
      setShowModal(false);
    } else {
      toast.error("Please enter names for both players.");
    }
  };
  const clearGameHistory = async () => {
    const confirmClear = window.confirm("Are you sure you want to clear the game history?");
    if (confirmClear) {
      try {
        await axios.delete("/games/delete");
        setGameHistory([]);
        toast.success("Game history cleared.");
      } catch (error) {
        console.error("Error clearing game history:", error);
        toast.error("Error clearing game history.");
      }
    }
  };

  const handleViewHistoryClick = () => {
    setShowHistoryModal(true);
  };

  const updateGameHistory = async (record) => {
    try {
      const response = await axios.post("/games/games", record);
    } catch (error) {
      console.error("Error saving game history:", error);
    }
  };

  useEffect(() => {
    async function fetchGameHistory() {
      try {
        const response = await axios.get("/games/games");
        setGameHistory(response.data.games);
      } catch (error) {
        console.error("Error fetching game history:", error);
      }
    }
    fetchGameHistory();
  }, []);

  
  return (
    <div className="container">
       <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="header__d-flex justify-content-center">
    <span className="word">Tic</span>
    </h1>
    <h1 className="header__d-flex justify-content-center">
    <span className="word2">Tac-Toe</span>
  </h1>

      <div className="header2__ pt-5">
        <button className="start__button" onClick={handleStartGameClick}>
          START NEW GAME
        </button>
      </div>
      <div className="header3__ pt-4">
        <button className="start__button" onClick={handleViewHistoryClick}>GAME HISTORY</button>
      </div>

      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <h2 className="new__game">NEW GAME SESSION</h2>
            <input className="input__ "
              type="text"
              placeholder="Player 1 Name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
            <input className="mt-1 input__"
              type="text"
              placeholder="Player 2 Name"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
            />
            <button className="start__button1 mt-3" onClick={handleStartButtonClick}>START</button>
            <button className="start__button2" onClick={() => setShowModal(false)}>CANCEL</button>
          </div>
        </div>
      )}

{showHistoryModal && (
  <div className="modal-container">
    <div className="modal-content">
      <h2 className="game__history">Game History</h2>
      <ul className="history__">
        {gameHistory.map((record, index) => (
          <li key={index}>
            {record.player1} vs {record.player2}:{" "}
            {record.result === "Draw" ? "Draw" : `${record.result} wins`}
          </li>
        ))}
      </ul>
      <button className="clear__" onClick={clearGameHistory}>Clear</button>
      <button className="close__" onClick={() => setShowHistoryModal(false)}>Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default HomePage;
