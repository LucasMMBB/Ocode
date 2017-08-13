var express = require('express')
var app = express()
var restRouter = require("./routes/rest")
var indexRouter = require('./routes/index')
var mongoose = require("mongoose");
var path = require('path');
var http = require('http');

var socket_io = require('socket.io');
var io = socket_io();
var SocketService = require('./services/SocketService.js')(io);


mongoose.connect('mongodb://user:user@ds019058.mlab.com:19058/coj');

app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, '../public')));
app.use("/api/v1", restRouter);

app.use((req, res) => {
	// send index.html to client side
	res.sendFile("index.html", {root: path.join(__dirname, '../public/')});
});



// ---- server for socket.io in node
var server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
	throw error;
}

function onListening() {
	var addr = server.address();
	var bind = typeof addr == 'string'
		? 'pipe' + addr
		: 'port' + addr.port;
	console.log('Listening on ' + bind);
}