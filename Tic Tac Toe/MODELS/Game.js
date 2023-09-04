const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  result: String, 
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
