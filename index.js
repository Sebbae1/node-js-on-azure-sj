var http = require('http');
var url = require('url');
var dt = require('./datetime');
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

const server = http.createServer((request, response) => {
    // Write the request to the log. 
    console.log(request);

    // Standard Hello World.
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h3>Hello World!</h3>')

    // Access funcion from a separate JavaScript module.
    response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");

    // Show the url. 
    response.write("req.url="+request.url+"<br><br>");

    // Suggest adding something tl the url so that we can parse it. 
    response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
    var q = url.parse(request.url, true).query;
    var txt = q.year + " " + q.month;
    response.write("txt="+txt);

    // Close the response
    response.end('<h3>The End.</h3>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Dice API running on port ${PORT}`)
);

console.log("Server running at http://localhost:%d", port);