var host = "127.0.0.1";
var port = 1337;
var express = require("express");

var login = require("./api/login/index");
var auth = require("./api/auth/index");
var cdbkey = require("./api/cdbkey/index");

var app = express();

app.get('/api/joinkey', function routeHandler(req: any, res: any) {
    console.log ('/api/joinkey');
    if (req.query.session == process.env.SessionKey) {    
       res.send(process.env.SessionKey);
    } 
    console.log ('/api/joinkey end');
});

app.get('/api/aikey', function routeHandler(req: any, res: any) {
    console.log ('/api/aikey');    
    if (req.query.session == process.env.SessionKey) {           
       res.send(process.env.AzureAiKey);
    }
});


app.get('/api/cdbkey',  function routeHandler(req: any, res: any) {

    console.log ('/api/cdbkey');
    if (req.query.session == process.env.SessionKey) {           
        res.send(process.env.CosmosApiKey);
     }
});

app.get('/api/login', async function routeHandler(req: any, res: any) {

    console.log ('/api/login');
    await login (null, req, res);
});

app.get('/api/auth', async function routeHandler(req: any, res: any) {

    console.log ('/api/auth');
    await auth (null, req, res);
});

app.use('/', express.static('./public'));
app.listen(port, host);