var host = "127.0.0.1";
var port = 1337;
var express = require("express");

var app = express();

app.get('/api/fluidkey', async function routeHandler(req, res) {
   
   console.log ('/api/fluidkey');
   if ((req.query.session === process.env.SessionKey) || (req.query.session === process.env.SessionKey2)) {
      res.send (process.env.ConversationKey);
   }
});

app.use('/', express.static('./public'));
app.listen(port, host);