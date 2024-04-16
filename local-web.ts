var host = "127.0.0.1";
var port = 1337;
var express = require("express");

var login = require("./api/login/index");
var auth = require("./api/auth/index");
var dbkey = require("./api/dbkey/index");

import { messageLocalApi } from './api/message/message';

var app = express();

app.get('/api/joinkey', function routeHandler(req: any, res: any) {
    if (req.query.session == process.env.SessionKey) {    
       res.send(process.env.SessionKey);
    }
});

app.get('/api/aikey', function routeHandler(req: any, res: any) {
    if (req.query.session == process.env.SessionKey) {           
       res.send(process.env.OpenAiKey);
    }
});

app.get('/api/dbkey', function routeHandler(req: any, res: any) {

    dbkey (null, req, res);    
});

app.get('/api/login', function routeHandler(req: any, res: any) {

    login (null, req, res);
});

app.get('/api/auth', function routeHandler(req: any, res: any) {

    auth (null, req, res);
});

app.get('/api/message', async function routeHandler(req: any, res: any) {

    let response = await messageLocalApi (req.query.session);

    res.send (response.body);
});

app.use('/', express.static('./public'));
app.listen(port, host);