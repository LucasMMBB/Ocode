var express = require('express')
var app = express()
var restRouter = require("./routes/rest")
var mongoose = require("mongoose");

mongoose.connect('mongodb://user:user@ds019058.mlab.com:19058/coj');

app.use("/api/v1", restRouter);

app.listen(3000, function(){
	console.log("App listening on port 3000");
});