var Sequelize = require("sequelize");

var database = new Sequelize('fiverr','root','kakaroot',{
  dialect:'mysql',
  host:'localhost'
});

module.exports = database;
