const Sequelize   = require('sequelize');
const dbSequelize = require("./../database");

let Message = dbSequelize.define('message',{
  id:{
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false
  },
  status:{
    type:Sequelize.BOOLEAN,
    allowNull:false
  },
  message:{
    type:Sequelize.STRING,
    allowNull:false
  },
  title:{
    type:Sequelize.STRING,
    allowNull:false
  }
});

module.exports = Message;
