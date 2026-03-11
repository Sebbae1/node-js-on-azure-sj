/*
    Creator: Sebastian Jaculbe
    Created: March 1st, 2026
    Updated: March 1st, 2026 
*/
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Wake-up endpoint
app.get('/api/wakeup', cors(), (req, res) => {
    res.json({ status: 'awake', message: 'Server is ready.' });
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

app.get('/api/cors-fail', (req, res) => {
    res.json({ message: 'CORS fail example.' });
});

app.listen(port, () => {
    console.log(`Dice Roller API listening on port ${port}`);
});