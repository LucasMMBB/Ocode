var express = require('express');
var app = express();
var http = require('http');
var path = require("path");
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");

var socket_io = require('socket.io');
var io = socket_io();
var editorSocketService = require('./services/editorSocketService.js')(io);

var mongoose = require("mongoose");
mongoose.connect("mongodb://user:user@ds145039.mlab.com:45039/collaborative_oj");

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use("/api/v1", restRouter);
app.use(function(req, res) {
    // send index.html to start client side
    res.sendFile("index.html", { root: path.join(__dirname, '../public/') });
});

// create http server
var server = http.createServer(app);
io.attach(server);
server.listen(3000);
