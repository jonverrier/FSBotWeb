var host = "127.0.0.1";
var port = 1337;
var express = require("express");

<<<<<<< HEAD
var fluidKey = require("./api/fluidkey/index");
var aiKey = require("./api/aikey/index");

=======
>>>>>>> develop
var app = express();

app.get('/api/fluidkey', async function routeHandler(req, res) {
   
   console.log ('/api/fluidkey');
   if ((req.query.session === process.env.SessionKey) || (req.query.session === process.env.SessionKey2)) {
      res.send (process.env.ConversationKey);
   }
});

<<<<<<< HEAD
app.get('/api/aikey', async function routeHandler(req, res) {
    console.log ('/api/aikey');    
    if ((req.query.session === process.env.SessionKey) || (req.query.session === process.env.SessionKey2)) {
       res.send (process.env.AzureAiKey);
    }
});

=======
>>>>>>> develop
app.use('/', express.static('./public'));
app.listen(port, host);