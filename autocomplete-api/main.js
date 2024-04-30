"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
var port = process.env.PORT || 8000;
app.use(cors());
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
app.get('/', function (req, res) {
    res.send(req);
    res.send(getCityData(req.query.city));
});
function getCities(city) { }
