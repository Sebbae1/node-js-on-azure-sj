/*
    Creator: Sebastian Jaculbe
    Created: March 1st, 2026
    Updated: March 24th, 2026 
*/
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
// Wake-up endpoint
app.get('/api/wakeup', cors(), (req, res) => {
    res.json({ status: 'awake', message: 'Server is ready.' });
});

// Dice roll endpoint
app.get('/api/roll', cors(), (req, res) => {
    const sides = parseInt(req.query.sides) || 20;
    const result = Math.floor(Math.random() * sides) + 1;
    res.json({ sides: sides, result: result });
});

// CORS Failure API
app.get('/api/cors-fail', (req, res) => {
    res.json({ message: 'CORS fail example.' });
});

app.listen(port, () => {
    console.log(`Dice Roller API listening on port ${port}`);
});