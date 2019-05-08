const Sequelize   = require('sequelize');
const dbSequelize = require("./../database");

let Category = dbSequelize.define('category',{
  cat_id:{
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false
  },
  cat_name:{
    type:Sequelize.STRING,
    allowNull:false
  }
});

module.exports = Category;
