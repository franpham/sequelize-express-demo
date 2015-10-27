"use strict";

var parser = require('body-parser');
var express = require('express');
var app = express();
var db = require('./models');   // uses folder's index.js by default;
var User = db.User;

app.use(parser.json());   // for parsing application/json
app.use(parser.urlencoded({ extended: true }));   // for parsing form data: application/x-www-form-urlencoded

// var multer = require('multer');
// app.use(multer());    // for parsing form uploads: multipart/form-data;

app.listen(3000, function() {
  db.sequelize.sync();
  console.log('Database synced.');
});

app.get('/', function(req, res) {
  res.send('Synced to database.');
});

app.post('/users', function(req, res) {
  User.create({ username: req.body.username })
    .then(function(user) {
      res.json(user);
    });
});

app.get('/users', function(req, res) {
  User.findAll()
    .then(function(users) {
      res.json(users);
    });
});
