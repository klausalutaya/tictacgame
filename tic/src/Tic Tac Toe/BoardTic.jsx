import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import "./tictac.css";
import axios from "axios";
import { Link } from "react-router-dom";
import RefreshIcon from '@material-ui/icons/Refresh';
import HomeIcon from '@material-ui/icons/Home';



function Board({ updateGameHistory }) {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const player1NameParam = searchParams.get("player1");
  const player2NameParam = searchParams.get("player2");

  const [boardData, setBoardData] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [playerXWins, setPlayerXWins] = useState(0);
  const [playerOWins, setPlayerOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [player1Name] = useState(player1NameParam || "Player 1");
  const [player2Name] = useState(player2NameParam || "Player 2");

  const handleReset = () => {
    setBoardData(Array(9).fill(null));
    setPlayer("X");
    setShowResultModal(false);
    setWinner(null);
  };

  const checkForWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ) {
        return boardData[a];
      }
    }
    return null;
  };

  const switchPlayer = () => {
    setPlayer(player === "X" ? "O" : "X");
  };

  const updateBoard = (index) => {
    const newBoardData = [...boardData];
    if (newBoardData[index] === null) {
      newBoardData[index] = player;
      setBoardData(newBoardData);
      switchPlayer();
    }
  };

  const handleContinue = async () => {
    let gameResult = winner === "X" ? player1Name : player2Name;

    if (winner === null) {
      gameResult 2 = "Draw";
    }

    try {
      const response = await axios.post("/games/games", {
        player1: player1Name,
        player2: player2Name,
        result: gameResult,
      });

      console.log(response.data);

      if (winner === "X") {
        setPlayerXWins(playerXWins + 1);
      } else if (winner === "O") {
        setPlayerOWins(playerOWins + 1);
      } else {
        setDraws(draws + 1);
      }

      setBoardData(Array(9).fill(null));
      setPlayer(player === "X" ? "O" : "X");
      setShowResultModal(false);
      setWinner(null);
    } catch (error) {
      console.error("Error saving game history:", error);

    }
  };



  const handleStop = async () => {
    const gameResult = winner === "X" ? player1Name : player2Name;

    try {
      await handleContinue();

      setShowResultModal(false);
      setWinner(null);
    } catch (error) {
      console.error("Error saving game history:", error);

    }
  };


  useEffect(() => {
    const winner = checkForWinner();
    if (winner) {
      setShowResultModal(true);
      setWinner(winner);
      setResultMessage(`Winner: ${winner === "X" ? player1Name : player2Name}`);
    } else if (boardData.every((tile) => tile !== null)) {
      setShowResultModal(true);
      setResultMessage("Draw");
    }
  }, [boardData]);

  function Tile({ index, tile, updateBoard }) {
    const handleClick = () => {
      updateBoard(index);
    };
    return (
      <div className="Tile" onClick={handleClick}>
        <h1>{tile}</h1>
      </div>
    );
  }

  function BoardComponent() {
    return (
      <div className="Board">
        {boardData.map((tile, index) => (
          <Tile key={index} index={index} tile={tile} updateBoard={updateBoard} />
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <Modal
        isOpen={showResultModal}
        onRequestClose={() => setShowResultModal(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>{resultMessage}</h2>
        <button onClick={handleContinue} className="continue__">
          Continue
        </button>
        <button onClick={handleStop} className="stop__button">
          <a href="/" style={{ textDecoration: "none" }} className="stop__">
            Stop
          </a>
        </button>
      </Modal>
      <h1 className="header__d-flex justify-content-center">
        <span className="word">Tic</span>
      </h1>
      <h1 className="header__d-flex justify-content-center mb-0">
        <span className="word2">Tac-Toe</span>
      </h1>
      <div className="d-flex reset__button mb-1">
        <button className="home1__">
          <Link to="/">
            <HomeIcon style={{ fontSize: 40 }} />
          </Link>
        </button>
        <button onClick={handleReset}>
          <RefreshIcon style={{ fontSize: 40 }} />
        </button>
      </div>
      <BoardComponent />
      <div className="players__ mb-5">
        <div className="player-box">
          <h2 className="player1__  ">
            {player1Name}: {playerXWins}
          </h2>
        </div>
        <div className="player-box3">
          <h2 className="draw__ ">Draw: {draws}</h2>
        </div>
        <div className="player-box2">
          <h2 className="">
            {player2Name}: {playerOWins}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Board;