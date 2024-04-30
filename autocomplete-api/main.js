"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var path = require("path");
var fs = require("fs");
var app = express();
var port = process.env.PORT || 8000;
app.use(cors());
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
app.get('/', function (req, res) {
    fs.readFile(path.join(__dirname, 'world-cities.txt'), 'utf8', function (err, data) {
        if (err) {
            res.status(500).send('Error reading file.');
            return;
        }
        var cities = data.split('\n').map(function (city) { return ({ name: city.trim() }); });
        console.log(cities); // Debug: Log the cities array to see if it's correct
        res.json(cities);
    });
});
