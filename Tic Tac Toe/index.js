// Server creation and Database Connection
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./ROUTES/game");
const app = express();

//MongoDB Connection SRV
mongoose.connect("mongodb+srv://admin:admin123@zuittbootcamp.eewiz6q.mongodb.net/Game?retryWrites=true&w=majority",
{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//Optional - Validation of DB Connection
mongoose.connection.once("open", () => console.log("Now connected to Tic Tac Toe"));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json({ limit: '5mb' }));


// Defines the "/users" to be included for all user routes defined in the "user" route file
app.use("/games", userRoutes);



// PORT LISTENING
if(require.main === module){
	app.listen(process.env.PORT || 4004, () => console.log(`API is now online on port ${process.env.PORT || 4004}`));
}

module.exports = app;