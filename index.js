const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Wake-up endpoint
app.get("/api/ping", (req, res) => {
    res.json({ status: "awake" });
});

// Dice roll endpoint
app.get("/api/roll", (req, res) => {
    const count = parseInt(req.query.count) || 5;
    const sides = parseInt(req.query.sides) || 6;

    const rolls = [];
    for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }

    res.json({
        count,
        sides,
        rolls
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Dice API running on port ${PORT}`)
);