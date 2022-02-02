var Sequelize = require("sequelize");

var database = new Sequelize('','','',{
  dialect:'mysql',
  host:'localhost'
});

module.exports = database;
