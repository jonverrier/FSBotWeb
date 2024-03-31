var host = "127.0.0.1";
var port = 1337;
var express = require("express");

var login = require("./api/login/index");
var auth = require("./api/auth/index");

var app = express();

app.get('/api/joinkey', function routeHandler(req, res) {
    if (req.query.JoinKey == process.env.JoinKey) {    
       console.log (process.env.JoinKey);
       res.send(process.env.JoinKey);
    }
});

app.get('/api/aikey', function routeHandler(req, res) {
    if (req.query.JoinKey == process.env.JoinKey) {     
       console.log (process.env.OpenAiKey);        
       res.send(process.env.OpenAiKey);
    }
});

app.get('/api/dbkey', function routeHandler(req, res) {
    if (req.query.JoinKey == process.env.JoinKey) {  
       console.log (process.env.MongoApiKey);      
       res.send(process.env.MongoApiKey);
    }
});

app.get('/api/login', function routeHandler(req, res) {

    login (null, req, res);
});

app.get('/api/auth', function routeHandler(req, res) {

    auth (null, req, res);
});

app.use('/', express.static('./public'));
app.listen(port, host);