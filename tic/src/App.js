import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from "./Tic Tac Toe/TicTac.jsx"
import BoardTic from "./Tic Tac Toe/BoardTic.jsx"
import { Route, Routes } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<BoardTic />} />
      </Routes>
    </Router>
  );
}

export default App;