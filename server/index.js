const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/playersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const playerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number
});

const Player = mongoose.model("Player", playerSchema);

// Get all players
app.get("/v1/players", async (req, res) => {
    const isAdmin = req.query.isAdmin === "true";
    const players = await Player.find();

    const result = players.map(player => {
        return isAdmin ? {
            first_name: player.first_name,
            last_name: player.last_name,
            age: player.age
        } : {
            first_name: player.first_name,
            age: player.age
        };
    });
    res.json(result);
});

// Get player by ID
app.get("/v1/players/:id", async (req, res) => {
    const { id } = req.params;
    const isAdmin = req.query.isAdmin === "true";
    const player = await Player.findById(id);

    if (!player) {
        return res.status(404).json({ error: "Player not found" });
    }

    const result = isAdmin ? {
        first_name: player.first_name,
        last_name: player.last_name,
        age: player.age
    } : {
        first_name: player.first_name,
        age: player.age
    };
    res.json(result);
});

// AI-based nickname generation
const nicknames = {
    "USA": ["Slugger", "Ace", "Maverick"],
    "India": ["Master Blaster", "Hitman", "Wall"],
    "Australia": ["Kangaroo", "Thunder", "Boomer"]
};

app.get("/v1/nickname", async (req, res) => {
    const country = req.query.country || "USA";
    const nicknameList = nicknames[country] || ["Player"];
    res.json({ nickname: nicknameList[Math.floor(Math.random() * nicknameList.length)] });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
