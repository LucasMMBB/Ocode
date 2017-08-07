var express = require('express')
var app = express()
var restRouter = require("./routes/rest")
var indexRouter = require('./routes/index')
var mongoose = require("mongoose");
var path = require('path');
mongoose.connect('mongodb://user:user@ds019058.mlab.com:19058/coj');

app.use("/", indexRouter);
app.use("/problems", indexRouter);
app.use(express.static(path.join(__dirname, '../public')));
app.use("/api/v1", restRouter);

app.listen(3000, function(){
	console.log("App listening on port 3000");
});