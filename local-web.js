var host = "127.0.0.1";
var port = 1337;
var express = require("express");

var app = express();

app.use('/', express.static('./public'));

console.log ('Listening on:' + port.toString());

app.listen(port, host);