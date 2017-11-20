var express = require('express');                        // Dependencies Route Generating
var config = require('./config/config');                 // Config File for DB
var MongoClient = require("mongodb").MongoClient;        // Dependencies MongoDB for NOSQL Database
var ejs = require('ejs');                                // Dependencies EJS for template generating
var bodyParser = require('body-parser');                 // Dependencies BodyParser for POST request and grap body variables
var app = express();                                     // Call the Express function

/**
 * index.js
var mongoose = require("mongoose");
mongoose.connect("mongodb://admin:conf.password@ds033865.mlab.com:33865/weddings", function (errour) {});

Appelle d'un schema
var Prestataire = require('./schema/schemaPrestataire.js');
* schema.js
var mongoose = require('mongoose');

var PrestataireSchema = mongoose.Schema({
email : String,
paragraphe : [String]
})
module.exports = mongoose.model('Prestataire', PrestataireSchema);

PrestataireSchema.index({
  "$**": "text"
});

module.exports = mongoose.model('Prestataire', PrestataireSchema);




ensuite quand je veux chercher un prestataire avec l'id : id par exemple
je fais var query  = Prestataire.find(null);
query.where("_id",id);
query.exec(function(err,res){
console.log(res)

 */

// Function to launch Express
// The default port is 8080.
function startApp(callback) {
    app.listen(config.port, function () {
      console.log('Express server is listening on port ' + config.port);
        MongoClient.connect("mongodb://"+config.db.user+":"+config.db.password+"@"+config.db.host+":"+config.db.port+"/"+config.db.database, function(error, db) { 
          if(error) return console.log(error);
          callback(error, db);
      });
    });
}
// Render a template folder : "views"
// We are gonna put the HTML file  
app.use('/', express.static(__dirname + "/views/"));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

startApp(function(error, db) {
  console.log(db);
});
