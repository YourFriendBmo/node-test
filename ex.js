"use strict";

var express = require('express');
var app = express();

var mongojs = require('mongojs');
//var db = mongojs('mongodb://LVM:Lester99*@localhost/test', ['session']);
//app.set('db', 'mongodb://LVM:Lester99*@localhost/test');

var MongoStore = require('connect-mongo')(express);

app.use(express.logger()); //Log requests
app.use(express.compress()); //gzip/deflate
app.use(express.bodyParser()); //parse POST body automatically
app.use(express.cookieParser()); //Cookie support - must have if using cookie based sessions

 // Session support!
var session = express.session({
	 store: new MongoStore({
      //db: 'test',
	  url: 'mongodb://LVM:Lester99*@localhost/test'
	}),
	secret: 'superTopSecret' 
});
app.use(session);

// Global error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Uh oh!');
});

//STATIC FILES found in /public directory
// GET /javascripts/jquery.js
// GET /style.css
// GET /favicon.ico
app.use(express.static(__dirname + '/public'));

//app.use(function(req, res, next){
//  console.log(req.sessionID);
//  next();
//});


app.get('/', function(req, res){
	res.send('hello world!');
});

app.listen(3000);
console.log('Running on Port 3000');