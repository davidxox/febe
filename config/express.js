var express = require('express');
var glob = require('glob');
var cors = require('cors');

var bodyParser = require('body-parser');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));


 app.use(cors());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });
};
