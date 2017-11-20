//var db = require('../models');

var repo = {
  findById: function(id) {
    return db.collection("test").findAll();
  }

}

module.exports =  repo;
