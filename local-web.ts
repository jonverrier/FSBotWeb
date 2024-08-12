var host = "127.0.0.1";
var port = 1337;
var express = require("express");

var login = require("./api/login/index");
var auth = require("./api/auth/index");
var fluidKey = require("./api/fluidkey/index");
var aiKey = require("./api/aikey/index");

var app = express();

app.get('/api/fluidkey', async function routeHandler(req: any, res: any) {
   
   console.log ('/api/fluidkey');
   if ((req.query.session === process.env.SessionKey) || (req.query.session === process.env.SessionKey2)) {
      res.send (process.env.ConversationKey);
   }
});

app.get('/api/aikey', async function routeHandler(req: any, res: any) {
    console.log ('/api/aikey');    
    if ((req.query.session === process.env.SessionKey) || (req.query.session === process.env.SessionKey2)) {
       res.send (process.env.AzureAiKey);
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