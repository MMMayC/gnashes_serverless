// const express = require('express');
const express = require("serverless-express/express");
var app = express();



app.get("/test", (req, res) => res.send("Hello World!"));

module.exports = app;