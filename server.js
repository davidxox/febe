var express = require('express');                        // Dependencies Route Generating
var config = require('./config/config');                 // Config File for DB
var MongoClient = require("mongodb").MongoClient;        // Dependencies MongoDB for NOSQL Database
var ejs = require('ejs');                                // Dependencies EJS for template generating
var bodyParser = require('body-parser');                 // Dependencies BodyParser for POST request and grap body variables
var app = express();   
var db = require('./models');

function startApp() {
  app.listen(config.port, function () {
      console.log('Express server listening on port ' + config.port);
  });
}

db.sequelize.sync()
  .then(startApp)
  .catch(function (e) {
      throw new Error(e);
  });
// Render a template folder : "views"
// We are gonna put the HTML file  
app.use('/', express.static(__dirname + "/views/"));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
