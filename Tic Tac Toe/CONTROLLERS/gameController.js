const Game = require("../MODELS/Game"); // Import the Game model

module.exports = {
  createGame: async gameData => {
    try {
      const { player1, player2, result } = gameData;
      const game = new Game({ player1, player2, result });
      await game.save();
      return { success: true, message: "Game record created successfully" };
    } catch (error) {
      console.error("Error creating game:", error);
      return { success: false, message: "An error occurred while creating the game record" };
    }
  },
  

  getAllGames: async () => {
    try {
      const games = await Game.find();
      return { success: true, games };
    } catch (error) {
      return { success: false, message: "An error occurred while fetching game records" };
    }
  },

  deleteAllGames: async () => {
    try {
      const result = await Game.deleteMany({});
      return result;
    } catch (error) {
      throw error;
    }
  }
};
