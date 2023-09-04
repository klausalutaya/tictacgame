const express = require("express");
const router = express.Router();
const gameController = require("../CONTROLLERS/gameController");
router.post("/games", async (req, res) => {
  try {
    const result = await gameController.createGame(req.body);
    res.status(201).json(result); 
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
});

router.get("/games", (req, res) => {
  gameController.getAllGames().then(resultFromController => res.send(resultFromController));
});


router.delete('/delete', async (req, res) => {
  try {
    const deleteResult = await gameController.deleteAllGames();
    res.json({ message: `${deleteResult.deletedCount} game records deleted.` });
  } catch (error) {
    console.error('Error deleting all game records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;