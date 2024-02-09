var host = "127.0.0.1";
var port = 1337;
var express = require("express");

var app = express();

app.get('/api/joinkey', function routeHandler(req, res) {
    if (req.query.JoinKey == process.env.JoinKey) {    
       res.send(process.env.JoinKey);
    }
});

app.get('/api/aikey', function routeHandler(req, res) {
    if (req.query.JoinKey == process.env.JoinKey) {     
       res.send(process.env.OpenAiKey);
    }
});

app.use('/', express.static('./public'));
app.listen(port, host);